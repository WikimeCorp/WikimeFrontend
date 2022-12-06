import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface GenresState {
    genres: string[];
};

const initialState: GenresState = {
    genres: [],
};

export const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        addGenre: (state, action: PayloadAction<string>) => {
            state.genres.push(action.payload);
        },
        deleteGenre: (state, action: PayloadAction<string>) => {
            state.genres = state.genres.filter(item => item === action.payload);
        },
        clearGenres: (state) => {
            state.genres.length = 0;
        },
    }
});

export const { addGenre, deleteGenre, clearGenres } = genresSlice.actions;
export default genresSlice.reducer;