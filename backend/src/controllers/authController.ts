import { Request, Response } from 'express';
import * as userService from '../services/authService'

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body)
        res.status(201).json(user)
    } catch(error: any) {
        console.log("Error: ", error.message)
        res.status(400).json({error: error.message})
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await userService.getUser(email)
        res.status(201).json(user)
    } catch(error: any) {
        // Handle error
        console.error("Error: ", error.message);
        res.status(404).json({ error: error.message });
    }
}