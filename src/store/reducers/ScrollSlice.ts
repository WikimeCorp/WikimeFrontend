import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnime } from "../../types/IAnime";


interface ScrollState {
    data: IAnime[];
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    begin: number;
    end: number;
};

const initialState: ScrollState = {
    data: [],
    page: 0,
    perPage: 10,
    total: 0,
    totalPages: 0,
    begin: 0,
    end: 0,
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
            state.end = (state.page*state.perPage > state.total) ? 
                state.total : (state.page + 1)*state.perPage;
        },
        setData: (state, action: PayloadAction<IAnime[]>) => {
            state.data = action.payload;
        },
        addData: (state, action: PayloadAction<IAnime[]>) => {
            state.data = [...state.data, ...action.payload];
        },
    },
});

export const {
    setTotal,
    nextPage,
    setData,
    addData
} = scrollSlice.actions;
export default scrollSlice.reducer;