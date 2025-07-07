import mongoose, { Schema, Document } from 'mongoose';

export interface IFavouriteEntry extends Document {
    userId: string;
    key: string;
    value: string | number;
}

const FavouriteSchema: Schema = new Schema({
    userId: { type: String, required: true },
    key: { type: String, required: true },
    value: { type: String || Number, required: true },
}); 

export default mongoose.model<IFavouriteEntry>('Favourite', FavouriteSchema, "FavouriteList");