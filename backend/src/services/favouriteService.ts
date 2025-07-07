import axios from 'axios';
import Favourite from '../models/Favourite';

// Create and update favourite 
export const createFavourite = async (userId: string, key: string, value: string | number) => {
    const favouriteRecord = await Favourite.findOne({ userId: userId, key: key });
    if (favouriteRecord){
        const updatedDoc = await Favourite.findOneAndUpdate(
            { userId: userId, key: key },          
            { $set: { value: value } } ,
            { new: true }
        );
        return updatedDoc;
    }
    const newRecord = new Favourite({ userId,  key: key, value: value});
    return await newRecord.save();
}
// Get favourite
export const getFavourite = async (userId: string, key: string) => {
    const record = await Favourite.findOne({ userId: userId, key: key });
    // Handle record not existing
    if (!record){
        return undefined
    }
    return record;
}
