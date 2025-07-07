import { Request, Response } from 'express';
import { createPokedexRecord, getPokedexRecord, updatePokedexRecord } from '../services/pokedexService';


export const createRecord = async (req: Request, res: Response) => {
    try {
        const { userId, entries } = req.body;
        const record = await createPokedexRecord(userId, entries)
        res.status(201).json(record)
    } catch(error: any) {
        console.log("Error: ", error.message)
        res.status(400).json({error: error.message})
    }
}

export const getRecord = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const record = await getPokedexRecord(userId)
        res.status(201).json(record)
    } catch(error: any) {
        console.log("Error: ", error.message)
        res.status(400).json({error: error.message})
    }
}

export const updateRecord = async (req: Request, res: Response) => {
    try {
        const { userId, entries } = req.body;
        const record = await updatePokedexRecord(userId, entries)
        res.status(201).json(record)
    } catch(error: any) {
        console.log("Error: ", error.message)
        res.status(400).json({error: error.message})
    }
}


