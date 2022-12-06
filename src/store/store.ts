import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { animeAPI } from '../services/anime';
import btnsReducer from './reducers/BtnsSlice';
import genresReducer from './reducers/GenresSlice';
import authReduser from './reducers/AuthSlice';
import { authAPI } from '../services/auth';

const rootReducer = combineReducers({
    btnsReducer,
    genresReducer,
    [animeAPI.reducerPath]: animeAPI.reducer,
    VkAuth: authReduser,
    [authAPI.reducerPath]: authAPI.reducer, 
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                animeAPI.middleware,
                authAPI.middleware,
            ),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
setupListeners(setupStore().dispatch);