import { Request, Response } from 'express';
import { getItemList, getItemDetails } from '../services/itemService';

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