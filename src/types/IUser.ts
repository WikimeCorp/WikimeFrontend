export interface IUser {
    id: number,
    nickname: string,
    role: string,
    favorites: number[],
    watched: number[],
    rated: number[]
}