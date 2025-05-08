import mongoose, { Schema, Document } from 'mongoose';

export interface IPokedexEntry extends Document {
    id: number;
    name: string;
    type: string[];
  }


  const PokedexSchema: Schema = new Schema({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    sprite: {type: String, required: false},
    types: { type: [String], required: true },
  });
  
  export default mongoose.model<IPokedexEntry>('Pokedex', PokedexSchema, "PokedexList");