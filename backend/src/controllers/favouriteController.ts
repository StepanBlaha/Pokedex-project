import { Request, Response } from 'express';
import { createFavourite, getFavourite } from '../services/favouriteService';


export const createRecord = async (req: Request, res: Response) => {
    try {
        const { userId, key, value } = req.body;
        const record = await createFavourite(userId, key, value)
        res.status(201).json(record)
    } catch(error: any) {
        console.log("Error: ", error.message)
        res.status(400).json({error: error.message})
    }
}

export const getRecord = async (req: Request, res: Response) => {
    try {
        const { userId, key } = req.body;
        const record = await getFavourite(userId, key)
        res.status(201).json(record)
    } catch(error: any) {
        console.log("Error: ", error.message)
        res.status(400).json({error: error.message})
    }
}
