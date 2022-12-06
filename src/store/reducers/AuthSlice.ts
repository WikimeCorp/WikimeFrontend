import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../../services/auth";
import { IUser } from "../../types/IUser";
import { getAccessToken, getCode, getJWToken, getUserInfo } from "../actions/authActions";
import { RootState } from "../store";

interface authState {
    code?: string;
    accessToken?: string;
    loading: boolean;
    error: string | null; 
    user?: IUser;
};

const initialState: authState = {
    loading: false,
    error: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCode: {
            reducer: (state, action: PayloadAction<string>) => {
                state.code = action.payload;
            },
            prepare: getCode
        },
        logout: (state) => {
            localStorage.removeItem('userToken');
            state.code = undefined;
            state.accessToken = undefined;
            state.user = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAccessToken.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAccessToken.fulfilled, (state, action) => {
            state.accessToken = action.payload.token;
            state.loading = false;
        })      
        
        .addCase(getJWToken.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getJWToken.fulfilled, (state, action) => {
            localStorage.setItem('userToken', action.payload.AuthToken);
            state.loading = false;
        })  

        .addCase(getUserInfo.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserInfo.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })    
        
        // .addMatcher(
        //     authAPI.endpoints.getUser.matchFulfilled,
        //     (state, { payload }) => {
        //         state.user = payload;
        //     }
        // )
    }
});

export const { setCode, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.VkAuth.user;