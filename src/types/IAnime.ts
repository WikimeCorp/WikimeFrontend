export interface IAnime {
    id: number;    
    title: string;
    poster: string;
    originTitle: string;
    description: string;
    genres: string[];
    images: string[];
    director: string;
    releaseDate: string | number;
    author: number;
    rating: {
        five: number;
        four: number;
        three: number;
        two: number;
        one: number;
        inFavorites: number;
        average: number;
        watched: number;
    }
}