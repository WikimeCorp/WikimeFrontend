export interface IUser {
    userId: number,
    nickname: string,
    role: string,
    favorites: number[],
    watched: number[],
    rated: {id: number, Rate: number}[],
    avatar: string
}