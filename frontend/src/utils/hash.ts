import bcrypt from 'bcryptjs';
export const hashPassword = async (password: string, saltRounds: number)=>{
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
export const comparePasswords = async(newPass: string, oldPass: string)=>{
    const isMatch = await bcrypt.compare(newPass, oldPass);
    return isMatch;
}