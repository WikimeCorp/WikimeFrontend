import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAccessToken, getCode, getJWToken } from "../actions/authActions";

interface authState {
    code?: string;
    accessToken?: string;
    JWT?: string;
    loading: boolean;
    error: string | null; 
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
        }
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
            state.JWT = action.payload.AuthToken;
            localStorage.setItem('userToken', action.payload.AuthToken);
            state.loading = false;
        })      
    }
});

export const { setCode } = authSlice.actions;
export default authSlice.reducer;