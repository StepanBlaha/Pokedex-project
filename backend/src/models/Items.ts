import mongoose, { Schema, Document } from 'mongoose';
import { EffectEntry } from '../types/itemTypes';

export interface IItemEntry extends Document {
    id: number;
    name: string;
    category: string;
    cost: number;
    sprite: string;
    effect_entries: EffectEntry[];
  }


  const ItemSchema: Schema = new Schema({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    category: { type: String, required: true },
    cost: {type: Number, required: true},
    sprite: { type: String, required: true },
    effect_entries: {
    type: [
        {
        effect: { type: String, required: false },
        short_effect: { type: String, required: false },
        language: {
            name: { type: String, required: false },
            url: { type: String, required: false },
        },
        },
    ],
    required: true,
    },

  });
  
  export default mongoose.model<IItemEntry>('Items', ItemSchema, "ItemList");