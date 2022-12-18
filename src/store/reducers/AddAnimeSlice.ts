import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnime } from "../../types/IAnime";


const initialState: Partial<IAnime> = {
    genres: [],
};

export const AddAnimeSlice = createSlice({
    name: 'addAnime',
    initialState,
    reducers: {
        addGenre: (state, action: PayloadAction<string>) => {
            state.genres?.push(action.payload);
        },
        deleteGenre: (state, action: PayloadAction<string>) => {
            state.genres = state.genres?.filter(item => item !== action.payload);
        },
        setAddAnime: (state, action: PayloadAction<Partial<IAnime>>) => {
            state.title = action.payload.title;
            state.originTitle = action.payload.originTitle;
            state.director = action.payload.director;
            state.releaseDate = action.payload.releaseDate;
            state.description = action.payload.description;
        },
        setAnimeId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        }, 
        setAddAnimeImgs: (state, action: PayloadAction<{poster?: string, arts?: string[]}>) => {
            state.poster = action.payload.poster;
            state.images = action.payload.arts;
        },       
        cleanAddAnime: () => initialState,
    }
});

export const { addGenre, deleteGenre, setAddAnime, setAnimeId, setAddAnimeImgs, cleanAddAnime } = AddAnimeSlice.actions;
export default AddAnimeSlice.reducer;