import { Request, Response } from 'express';
import * as userService from '../services/authService'

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user = userService.createUser(req.body)
        res.status(201).json(user)
    } catch(error: any) {
        res.status(400).json({error: error.message})
    }
}
  