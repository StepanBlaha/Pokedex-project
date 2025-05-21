import mongoose, { Schema, Document } from 'mongoose';

export interface IUserEntry extends Document {
    name: string;
    email: string;
    role: string;
    password: string;
  }


const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.'],
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: true, minlength: 8}
    
});
  
export default mongoose.model<IUserEntry>('User', UserSchema, "Users");