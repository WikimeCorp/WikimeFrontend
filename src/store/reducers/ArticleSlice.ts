import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticle } from "../../models/IArticle"
import { fetchArticles } from "../action-creators/article";

interface ArticleState {
    articles: IArticle[];
    isloading: boolean;
    error: string;
}

const initialState: ArticleState = {
    articles: [],
    isloading: false,
    error: '',
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers : {},
    extraReducers: {
        [fetchArticles.fulfilled.type]: (state, action: PayloadAction<IArticle[]>) => {
            state.isloading = false;
            state.error = '';
            state.articles = action.payload;
        }, 
        [fetchArticles.pending.type]: (state) => {
            state.isloading = true;
        }, 
        [fetchArticles.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isloading = false;
            state.error = action.payload;
        }, 
    }
})

export default articleSlice.reducer;