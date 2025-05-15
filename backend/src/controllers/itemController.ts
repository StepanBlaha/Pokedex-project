import { Request, Response } from 'express';
import { getItemList, getItemDetails } from '../services/itemService';
import Items from '../models/Items';

export const getItems = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string || '0');
        const limit = parseInt(req.query.limit as string || '10');
        const data = await getItemList(page, limit) as { results: { name: string, url: string }[] };

        const detailedData = await Promise.all(data.results.map(async (item: {name: string, url: string})=>{

            const segments = item.url.split('/');
            const id = parseInt(segments[segments.length - 2]);
            const data = await getItemDetails(id);

            return {
                id: data.id,
                name: data.name,
                sprite:data.sprites.default,
                cost: data.cost,
                category: data.category.name,
                attributes: data.attributes,
                flavor_text_entries: data.flavor_text_entries,
                effect_entries: data.effect_entries
            };
        }))

        res.json({
            page,
            results: detailedData,
        })

    } catch (error) {
        console.error('Error fetching Items:', error);
        res.status(500).json({ error: 'Failed to fetch Item data.' });
    }
}




export const createItemEntries  =  async (req: Request, res: Response) => {
     try {
        const page = parseInt('0');
        const limit = parseInt('1000000');
        const data = await getItemList(page, limit) as { results: { name: string, url: string }[] };

        const detailedData = await Promise.all(data.results.map(async (item: {name: string, url: string})=>{
            // Extract url
            const segments = item.url.split('/');
            const id = parseInt(segments[segments.length - 2]);

            // See if a record exists
            const exists = await Items.exists({id})
    
            if(exists){
                return null;
            }
            // Get additional data
            const data = await getItemDetails(id);
            // Generate new entry data
           const newEntry = {
                id: data.id,
                name: data.name ?? "unknown",
                sprite:data.sprites.default ?? "unknown",
                cost: data.cost ?? 0,
                category: data.category.name ?? "unknown" ,
                effect_entries: data.effect_entries 
            };
            // Create new db entry
            const itemEntry = new Items(newEntry)
            await itemEntry.save();
            return newEntry;

        }))

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


export const getSearchedItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search } = req.body;

    if (!search) {
      res.status(400).json({ error: 'Missing search string' });
      return
    }
    // Get the items
    const searchedItems = await Items.find({ name: new RegExp('^' + search, 'i') });
    // Return data
    res.json({ searchedItems });
  } catch (error) {
    console.error('Error searching Item entries:', error);
    res.status(500).json({ error: 'Failed to search Item entries.' });
  }
}

