export interface IUser {
    userId: number,
    nickname: string,
    role: string,
    favorites: number[],
    watched: number[],
    added: number[],
    rated: {id: number, Rate: number}[],
    avatar: string
}