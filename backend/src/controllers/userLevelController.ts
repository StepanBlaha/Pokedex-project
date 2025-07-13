import { Request, Response } from 'express';
import { createLevelRecord, getLevelRecord } from '../services/userLevelService';

export const createRecord = async (req: Request, res: Response) => {
    try {
        const { userId, xp } = req.body;
        const record = await createLevelRecord(userId, xp)
        res.status(201).json(record)
    } catch(error: any) {
        console.log("Error: ", error.message)
        res.status(400).json({error: error.message})
    }
}
export const getRecord = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const record = await getLevelRecord(userId)
        res.status(201).json(record)
    } catch(error: any) {
        console.log("Error: ", error.message)
        res.status(400).json({error: error.message})
    }
}