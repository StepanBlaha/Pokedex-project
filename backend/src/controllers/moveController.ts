import { Request, Response } from 'express';
import { getMoveList, getMoveDetails } from '../services/moveService';
import Moves from '../models/Moves';

export const getMoves = async (req: Request, res: Response)=>{
    try {
        const page = parseInt(req.query.page as string || '0');
        const limit = parseInt(req.query.limit as string || '10');
        const data = await getMoveList(page, limit) as { results: { name: string, url: string }[] };

        const detailedData = await Promise.all(data.results.map(async (move: {name: string, url: string})=>{
                // Extract url
                const segments = move.url.split('/');
                const id = parseInt(segments[segments.length - 2]);
                // Get the data
                const data = await getMoveDetails(id) as { 
                id: number;
                name: string;
                accuracy: number;
                damage_class: { name: string};
                meta:{category: { name: string}};
                power: number;
                pp: number;
                type:{name:string}
                };
                // Return the data
                return {
                id: data.id,
                name: data.name,
                accuracy: data.accuracy,
                class: data.damage_class.name,
                category: data.meta.category.name,
                power: data.power,
                pp: data.pp,
                type: data.type.name,
                };
            }));
        res.json({
            page,
            results: detailedData,
        })
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        res.status(500).json({ error: 'Failed to fetch Pokémon data.' });
    }
}



// Insert move entry into mongo - run only once
export const createMoveEntries  =  async (req: Request, res: Response) => {
     try {
        const page = parseInt('0');
        const limit = parseInt('1000000');
        const data = await getMoveList(page, limit) as { results: { name: string, url: string }[] };

        const detailedData = await Promise.all(data.results.map(async (move: {name: string, url: string})=>{
            // Extract url
            const segments = move.url.split('/');
            const id = parseInt(segments[segments.length - 2]);

            // See if a record exists
            const exists = await Moves.exists({id})
    
            if(exists){
            return null;
            }
            // Get the data
            const data = await getMoveDetails(id) as { 
            id: number;
            name: string;
            accuracy: number;
            damage_class: { name: string};
            meta:{category: { name: string}};
            power: number;
            pp: number;
            type:{name:string}
            };
                // Generate new entry data
           const newEntry = {
            id: data.id,
            name: data.name,
            accuracy: data.accuracy ?? 0,
            class: data.damage_class?.name ?? "unknown",
            category: data.meta?.category?.name ?? "unknown",
            power: data.power ?? 0,
            pp: data.pp ?? 0,
            type: data.type?.name ?? "unknown",
            };
            // Create new db entry
            const moveEntry = new Moves(newEntry)
            await moveEntry.save();
            return newEntry;
        }));
        // Get the data of all the inserted moves
        const insertedMoves = detailedData.filter(p => p !== null);

        // Return the data
        res.json({
            page,
            insertedCount: insertedMoves.length,
            inserted: insertedMoves
        });
    } catch (error) {
        console.error('Error inserting moves:', error);
        res.status(500).json({ error: 'Failed to insert move data.'+ error });
    }
};



export const getSearchedMove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search } = req.body;

    if (!search) {
      res.status(400).json({ error: 'Missing search string' });
      return
    }
    // Get the moves
    const searchedMoves = await Moves.find({ name: new RegExp('^' + search, 'i') });
    // Return data
    res.json({ searchedMoves });
  } catch (error) {
    console.error('Error searching Moves entries:', error);
    res.status(500).json({ error: 'Failed to search Moves entries.' });
  }
}


