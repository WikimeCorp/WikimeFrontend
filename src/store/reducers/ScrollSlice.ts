import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ScrollState {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    begin: number;
    end: number;
};

const initialState: ScrollState = {
    page: 0,
    perPage: 9,
    total: 0,
    totalPages: 0,
    begin: 0,
    end: 6,
};

export const scrollSlice = createSlice({
    name: 'scroll',
    initialState,
    reducers: {
        setTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
            state.totalPages = Math.ceil( action.payload / state.perPage );
            state.page = 0;
            state.end = state.perPage > action.payload ? action.payload : state.perPage;
        },
        nextPage: (state) => {
            state.page = state.page + 1;
            state.end = (state.page * state.perPage > state.total) ? 
                state.total : (state.page + 1) * state.perPage;
        },
    },
});

export const {
    setTotal,
    nextPage
} = scrollSlice.actions;
export default scrollSlice.reducer;