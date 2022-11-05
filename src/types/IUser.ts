export interface IUser {
    id: number;
    nickname: string;
    photo: string;
    role: string;
    favorites: number[];
    watched: number[];
    added: number[];
}