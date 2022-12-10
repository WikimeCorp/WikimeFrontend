import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfo } from "../actions/authActions";
import { 
    addToFavorites, addToWatched, getAdmins, getModerators, 
    removeFromFavorites, resetRole, updateNickname, updateRole 
} from "../actions/userActions";


interface userState {
    favorites: number[];
    watched: number[];
    nickname: string;
    moderators: number[];
    admins: number[];
    loading: boolean;
    error?: string | null;
};

const initialState: userState = {
    favorites: [],
    watched: [],
    nickname: '',
    moderators: [],
    admins: [],
    loading: false,
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
            if (!state.watched.includes(action.payload))
                state.watched = [...state.watched, action.payload];
        },
        updateNick: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserInfo.fulfilled, (state, action) => {
            state.favorites = action.payload.favorites;
            state.nickname = action.payload.nickname;
            state.watched = action.payload.watched;
            state.loading = false;
        })

        .addCase(addToFavorites.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })     
        .addCase(removeFromFavorites.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })   

        .addCase(addToWatched.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })  

        .addCase(updateNickname.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })    
        
        .addCase(getModerators.pending, (state) => {
            state.loading = true;
        })
        .addCase(getModerators.fulfilled, (state, action) => {
            state.moderators = action.payload.ids;
            state.loading = false;
        })    
        .addCase(getModerators.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }) 
        
        .addCase(getAdmins.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAdmins.fulfilled, (state, action) => {
            state.admins = action.payload.ids;
            state.loading = false;
        })    
        .addCase(getAdmins.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }) 
        
        .addCase(updateRole.rejected, (state, action ) => {
            state.loading = false;
            state.error = action.payload;
        }) 
        
        .addCase(resetRole.rejected, (state, action ) => {
            state.loading = false;
            state.error = action.payload;
        }) 
    }
});

export const { addFav, delFav, clean, addWatched, updateNick } = userSlice.actions;
export default userSlice.reducer;