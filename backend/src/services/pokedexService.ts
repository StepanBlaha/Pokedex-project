import axios from 'axios';
import UserPokedex from '../models/UserPokedex';

export const createPokedexRecord = async (userId: string, data: number[]) => {
    const pokedexRecord = await UserPokedex.findOne({ userId: userId });
    if (pokedexRecord){
        throw new Error('Record already exists');
    }
    const newRecord = new UserPokedex({ userId, pokemonIds: data });
    return await newRecord.save();
}

export const getPokedexRecord = async (userId: string) => {
    const record = await UserPokedex.findOne({ userId: userId });
    // Handle record not existing
    if (!record){
        const newRecord = new UserPokedex({ userId, pokemonIds: [] });
        return await newRecord.save();
    }
    return record;
}

export const updatePokedexRecord = async (userId: string, data: number[]) => {
    const record = await UserPokedex.findOne({ userId: userId });
    // Handle record not existing
    if (!record){
        const newRecord = new UserPokedex({ userId, pokemonIds: data });
        return await newRecord.save();
    }
    const updatedDoc = await UserPokedex.findOneAndUpdate(
        { userId: userId },          
        { $set: { pokemonIds: data } } ,
        { new: true }
    );
    return updatedDoc;
}