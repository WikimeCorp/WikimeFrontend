import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ListState {
    sort: string;
    isListView: boolean;
};

const initialState: ListState = {
    sort: "popular",
    isListView: true,
};

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        selectSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
        },
        changeView: (state, action: PayloadAction<boolean>) => {
            state.isListView = action.payload;
        }
    }
});

export const { selectSort, changeView } = listSlice.actions;
export default listSlice.reducer;