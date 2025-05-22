import User from "../models/Users"

export const createUser = async (data: any) => {
    const userExists = await User.findOne({ email: data.email });
    if (userExists){
        throw new Error('Email is already registered');
        return "Email is already registered"
    }
        

    const newUser = new User(data);
    return await newUser.save();
}
