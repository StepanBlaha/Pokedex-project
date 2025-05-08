import mongoose, { Schema, Document } from 'mongoose';

export interface IPokemon extends Document {
    name: string;
    type: string[];
  }


  const PokemonSchema: Schema = new Schema({
    name: { type: String, required: true },
    type: { type: [String], required: true },
  });
  
  export default mongoose.model<IPokemon>('Pokemon', PokemonSchema, "PokemonList");