import { createAsyncThunk } from "@reduxjs/toolkit";
import { addFav, delFav } from "../reducers/UserSlice";


const apiHost = process.env.REACT_APP_API_HOST;
const apiPort = process.env.REACT_APP_API_PORT;

type ErrorResponse = {
    error_message: string;
    error: number;
};

export const addToFavorites = createAsyncThunk<any, number, {rejectValue: string}>(
    'user/addToFavorites',
    async (id, {rejectWithValue, dispatch}) => {
        try {
            const token = localStorage.getItem('userToken');
            const settings = {
                method: 'POST',
                headers: { 'authorization': `${token}` },
                body: JSON.stringify({
                    "animeId": id
                })
            };
            
            const response = await fetch(`http://${apiHost}/users/current/favorites`, settings);
            
            if (!response.ok) {
                throw new Error("Server error.");
            };

            dispatch(addFav(id));

        } catch (error) {
            return rejectWithValue('Не удалось добавить аниме в избранное');
        }         
    }
);


export const removeFromFavorites = createAsyncThunk<any, number, {rejectValue: string}>(
    'user/removeFromFavorites',
    async (id, {rejectWithValue, dispatch}) => {
        try {
            const token = localStorage.getItem('userToken');
            const settings = {
                method: 'DELETE',
                headers: { 'authorization': `${token}` },
                body: JSON.stringify({
                    "animeId": id
                })
            };
        
            const response = await fetch(`http://${apiHost}/users/current/favorites`, settings);

            if (!response.ok) {
                throw new Error("Server error.");
            };

            dispatch(delFav(id));

        } catch (error) {
            return rejectWithValue('Не удалось удалить аниме из избранного');
        };                 
    }
);

export const addToWatched = createAsyncThunk<any, number, {rejectValue: string}>(
    'user/addToWatched',
    async (id, {rejectWithValue, dispatch}) => {
        try {
            const token = localStorage.getItem('userToken');
            const settings = {
                method: 'POST',
                headers: { 'authorization': `${token}` },
                body: JSON.stringify({
                    "animeId": id
                })
            };
            
            const response = await fetch(`http://${apiHost}/users/current/watched`, settings);
            
            if (!response.ok) {
                throw new Error("Server error.");
            };

        } catch (error) {
            return rejectWithValue('Не удалось добавить аниме в просмотренное');
        }         
    }
);