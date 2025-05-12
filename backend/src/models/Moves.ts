import mongoose, { Schema, Document } from 'mongoose';

export interface IMoveEntry extends Document {
    id: number;
    name: string;
    accuracy: number;
    class: string;
    category: string;
    power: number;
    pp: number;
    type: string
  }


  const MoveSchema: Schema = new Schema({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    accuracy: {type: Number, required: true},
    class: { type: String, required: true },
    category: { type: String, required: true },
    power: {type: Number, required: true},
    pp: {type: Number, required: true},
    type: { type: String, required: true },
  });
  
  export default mongoose.model<IMoveEntry>('Moves', MoveSchema, "MoveList");