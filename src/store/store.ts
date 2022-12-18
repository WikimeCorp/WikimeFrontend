import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { animeAPI } from '../services/anime';
import btnsReducer from './reducers/BtnsSlice';
import addAnimeReducer from './reducers/AddAnimeSlice';
import authReduser from './reducers/AuthSlice';
import userReduser from './reducers/UserSlice';
import scrollReducer from './reducers/ScrollSlice';


const rootReducer = combineReducers({
    btnsReducer,
    addAnimeReducer,
    scrollReducer,
    userReduser,
    [animeAPI.reducerPath]: animeAPI.reducer,
    VkAuth: authReduser,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                animeAPI.middleware,
            ),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
setupListeners(setupStore().dispatch);