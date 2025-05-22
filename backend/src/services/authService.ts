import User from "../models/Users"

export const createUser = async (data: any) => {
    const userExists = await User.findOne({ email: data.email });
    if (userExists){
        throw new Error('Email is already registered');
    }
        
    const newUser = new User(data);
    return await newUser.save();
}

export const getUser = async (email: string) => {
    const user = await User.findOne({ email: email });
    // Handle email not existing
    if (!user){
        throw new Error('User with this email doesnt exist');
    }
    return user;
}