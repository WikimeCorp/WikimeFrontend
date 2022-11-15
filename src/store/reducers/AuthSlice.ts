import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type AuthState = {
  id: string | null,
  token: string | null,
};

const initialState: AuthState = {
    id: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (
            state,
            { payload: { id, token } }: PayloadAction<{ id: string; token: string }>
        ) => {
            state.id = id;
            state.token = token;
        },
        removeUser: (state) => {
            state.id = null;
            state.token = null;
        },
    },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.id;