import mongoose, { Schema, Document } from 'mongoose';

export interface IUserPokedexEntry extends Document {
    userId: string;
    pokemonIds: number[];
}

const UserPokedexSchema: Schema = new Schema({
    userId: { type: String, required: true },
    pokemonIds: { type: [Number], required: true }  
});

export default mongoose.model<IUserPokedexEntry>('UserPokedex', UserPokedexSchema, "UserPokedexList");