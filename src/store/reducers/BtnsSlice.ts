import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface BtnsState {
    sort: string;
    isListView: boolean;
    isListViewUser: {
        fav: boolean;
        viewed: boolean;
        added: boolean;
    };
    usersLists: {
        fav: boolean;
        viewed: boolean;
        added: boolean;
    }
};

const initialState: BtnsState = {
    sort: "popular",
    isListView: true,
    isListViewUser: {
        fav: false,
        viewed: false,
        added: false,
    },
    usersLists: {
        fav: false,
        viewed: false,
        added: false,
    },
};

interface changeViewUserProps {
    newState: boolean;
    item: string;
}

export const btnsSlice = createSlice({
    name: 'btns',
    initialState,
    reducers: {
        selectSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
        },
        changeView: (state, action: PayloadAction<boolean>) => {
            state.isListView = action.payload;
        },
        changeViewUser: (state, action: PayloadAction<changeViewUserProps>) => {
            state.isListViewUser[action.payload.item as keyof typeof state.isListViewUser] = action.payload.newState;
        },
        changeViewUserLists: (state, action: PayloadAction<string>) => {
            state.usersLists[action.payload as keyof typeof state.usersLists] = 
            !state.usersLists[action.payload as keyof typeof state.usersLists];
        },
    }
});

export const { selectSort, changeView, changeViewUser, changeViewUserLists } = btnsSlice.actions;
export default btnsSlice.reducer;