import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfo } from "../actions/authActions";
import { addToFavorites, addToWatched, removeFromFavorites } from "../actions/userActions";


interface userState {
    favorites: number[];
    watched: number[];
    nickname: string;
    error?: string | null;
};

const initialState: userState = {
    favorites: [],
    watched: [],
    nickname: '',
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addFav: (state, action: PayloadAction<number>) => {
            state.favorites = [...state.favorites, action.payload];
        },
        delFav: (state, action: PayloadAction<number>) => {
            state.favorites = state.favorites.filter(item => item !== action.payload);
        },
        clean: (state) => {
            state.favorites = [];
            state.watched = [];
        },
        addWatched: (state, action: PayloadAction<number>) => {
            state.watched = [...state.watched, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserInfo.fulfilled, (state, action) => {
            state.favorites = action.payload.favorites;
            state.nickname = action.payload.nickname;
        })

        .addCase(addToFavorites.rejected, (state, action) => {
            state.error = action.payload;
        })     
        .addCase(removeFromFavorites.rejected, (state, action) => {
            state.error = action.payload;
        })   

        .addCase(addToWatched.rejected, (state, action) => {
            state.error = action.payload;
        })       
    }
});

export const { addFav, delFav, clean } = userSlice.actions;
export default userSlice.reducer;