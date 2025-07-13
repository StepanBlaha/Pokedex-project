import axios from 'axios';
import UserLevel from '../models/UserLevel';



export const getLevelRecord = async (userId: string) => {
    const record = await UserLevel.findOne({ userId: userId });
    // Handle record not existing
    if (!record){
        const newRecord = new UserLevel({ userId, xp: 0 });
        return await newRecord.save();
    }
    return record;
}

export const createLevelRecord = async (userId: string, xp: number) => {
    const record = await UserLevel.findOne({ userId: userId });
    // Handle record not existing
    if (!record){
        const newRecord = new UserLevel({ userId, xp: xp });
        return await newRecord.save();
    }
    const updatedDoc = await UserLevel.findOneAndUpdate(
        { userId: userId },          
        { $set: { xp: xp } } ,
        { new: true }
    );
    return updatedDoc;
}