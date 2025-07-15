export interface registerFormData{
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}
export interface loginFormData{
    email: string,
    password: string,
}
export interface User {
    name: string;
    email: string;
    role: string;
    password: string;
}
export interface userLevelResult{
    userId: string,
    xp: number
}