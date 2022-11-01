import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { animeAPI } from '../services/anime';
import listReducer from './reducers/ListSlice';
import articleReducer from './reducers/ArticleSlice';

const rootReducer = combineReducers({
    articleReducer,
    listReducer,
    [animeAPI.reducerPath]: animeAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(animeAPI.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
setupListeners(setupStore().dispatch);