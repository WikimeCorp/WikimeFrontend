export interface IUser {
    userId: number,
    nickname: string,
    role: string,
    favorites: number[],
    watched: number[],
    rated: number[]
}