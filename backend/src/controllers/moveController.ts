import { Request, Response } from 'express';
import { getMoveList, getMoveDetails } from '../services/moveService';

export const getMoves = async (req: Request, res: Response)=>{
    try {
        const page = parseInt(req.query.page as string || '1');
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