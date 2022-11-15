import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { animeAPI } from '../services/anime';
import { usersAPI } from '../services/users';
import { authAPI } from '../services/auth';
import btnsReducer from './reducers/BtnsSlice';
import genresReducer from './reducers/GenresSlice';
import authReducer from './reducers/AuthSlice';

const rootReducer = combineReducers({
    btnsReducer,
    genresReducer,
    [animeAPI.reducerPath]: animeAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    auth: authReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                animeAPI.middleware, 
                usersAPI.middleware,
                authAPI.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
setupListeners(setupStore().dispatch);