import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { ArticleReducer } from './reducers/articleReducer';

export const store = configureStore({
    reducer: {
        article: ArticleReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>