import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Admin } from '../../types/Admin';
import { IUser } from '../../types/IUser';
import { getUserInfo } from '../actions/authActions';
import { 
    addToFavorites, addToWatched, getAdmins, getModerators, 
    getUserById, 
    removeFromFavorites, resetRole, updateAvatar, updateNickname, updateRole 
} from '../actions/userActions';


interface userState {
    avatar?: string;
    rated: {id: number, Rate: number}[];
    favorites: number[];
    watched: number[];
    added: number[];
    nickname: string;
    moderators?: Admin[];
    admins?: Admin[];
    loading: boolean;
    error?: string | null;
};

const initialState: userState = {
    favorites: [],
    watched: [],
    added: [],
    rated: [],
    nickname: '',
    loading: false
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
        clean: () => initialState,
        addWatched: (state, action: PayloadAction<number>) => {
            if (!state.watched.includes(action.payload)) {
                state.watched = [...state.watched, action.payload];
            };            
        },
        updateNick: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload;
        },
        updateAva: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload;
        },
        addRate: (state, action: PayloadAction<{id: number, Rate: number}>) => {
            if (state.rated.some(item => item.id === action.payload.id)) {
                state.rated = state.rated.filter(item => item.id !== action.payload.id);
            };

            state.rated = [...state.rated, action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.fulfilled, (state, action) => {
                const payload = action.payload as IUser;
                state.avatar = payload.avatar;
                state.favorites = payload.favorites;
                state.nickname = payload.nickname;
                state.watched = payload.watched;
                state.added = payload.added;
                state.rated = payload.rated;
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
                state.moderators = action.payload;
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
                state.admins = action.payload;
                state.loading = false;
            })    
            .addCase(getAdmins.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) 
        
            .addCase(updateRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error_message;
            }) 
        
            .addCase(resetRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) 
            .addCase(resetRole.fulfilled, (state) => {
                state.loading = false;
                state.error = undefined;
            }) 

            .addCase(updateAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { addFav, delFav, clean, addWatched, updateNick, updateAva, addRate } = userSlice.actions;
export default userSlice.reducer;