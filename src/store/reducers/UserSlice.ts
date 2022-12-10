import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfo } from "../actions/authActions";
import { addToFavorites, removeFromFavorites } from "../actions/userActions";


interface userState {
    favorites: number[];
    nickname: string;
    error?: string | null;
};

const initialState: userState = {
    favorites: [],
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
        }
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
    }
});

export const { addFav, delFav } = userSlice.actions;
export default userSlice.reducer;