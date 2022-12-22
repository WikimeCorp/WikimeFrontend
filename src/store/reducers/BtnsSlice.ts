import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface BtnsState {
    sort: string;
    genres: string[];
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
    };
    addAdmins: boolean[];
};

const initialState: BtnsState = {
    sort: 'favorites',
    genres: [],
    isListView: true,
    isListViewUser: {
        fav: false,
        viewed: false,
        added: false
    },
    usersLists: {
        fav: false,
        viewed: false,
        added: false
    },
    addAdmins: [ false, false ]
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
        openAdding: (state, action: PayloadAction<number>) => {
            state.addAdmins[action.payload] = !state.addAdmins[action.payload];
        },
        addAllGenres: (state, action: PayloadAction<string[]>) => {
            state.genres = action.payload;
        },
        addGenre: (state, action: PayloadAction<string>) => {
            state.genres.push(action.payload);
        },
        deleteGenre: (state, action: PayloadAction<string>) => {
            state.genres = state.genres.filter(item => item !== action.payload);
        }
    }
});

export const {
    selectSort, 
    changeView, 
    changeViewUser, 
    changeViewUserLists, 
    openAdding,
    addGenre,
    deleteGenre,
    addAllGenres 
} = btnsSlice.actions;
export default btnsSlice.reducer;