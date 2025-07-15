import bcrypt from 'bcryptjs';
// Hash password
export const hashPassword = async (password: string, saltRounds: number)=>{
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
// Compare passwords
export const comparePasswords = async(newPass: string, oldPass: string)=>{
    const isMatch = await bcrypt.compare(newPass, oldPass);
    return isMatch;
}