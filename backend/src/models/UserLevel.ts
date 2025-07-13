import mongoose, { Schema, Document } from 'mongoose';

export interface IUserLevelEntry extends Document {
    userId: string;
    xp: number
}

const UserLevelSchema: Schema = new Schema({
    userId: { type: String, required: true },
    xp: { type: Number, required: true }  
});

export default mongoose.model<IUserLevelEntry>('UserLevel', UserLevelSchema, "UserLevelList");