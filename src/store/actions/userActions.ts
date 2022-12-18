import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../types/IUser";
import { addFav, addWatched, delFav, updateNick } from "../reducers/UserSlice";


const apiHost = process.env.REACT_APP_API_HOST;
const apiPort = process.env.REACT_APP_API_PORT;

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

            dispatch(addWatched(id));

        } catch (error) {
            return rejectWithValue('Не удалось добавить аниме в просмотренное');
        }         
    }
);

export const updateNickname = createAsyncThunk<any, string, {rejectValue: string}>(
    'user/updateNickname',
    async (name, {rejectWithValue, dispatch}) => {
        try {
            const token = localStorage.getItem('userToken');
            const settings = {
                method: 'PUT',
                headers: { 'authorization': `${token}` },
                body: JSON.stringify({
                    "nickname": name
                })
            };
            
            const response = await fetch(`http://${apiHost}/users/current/nickname`, settings);
            
            if (!response.ok) {
                throw new Error("Server error.");
            };

            dispatch(updateNick(name));

        } catch (error) {
            return rejectWithValue('Не удалось изменить никнейм');
        }         
    }
);

type getResponse = {
    ids: number[];
};

export const getModerators = createAsyncThunk<getResponse, void, {rejectValue: string}>(
    'user/getModerators',
    async (_, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('userToken');
            const settings = {
                method: 'GET',
                headers: { 'authorization': `${token}` }
            };
            
            const response = await fetch(`http://${apiHost}/users/moderators`, settings)
            .then(response => response.json());

            return (await response) as getResponse;

        } catch (error) {
            return rejectWithValue('Не удалось получить список модераторов');
        }         
    }
);

export const getAdmins = createAsyncThunk<getResponse, void, {rejectValue: string}>(
    'user/getAdmins',
    async (_, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('userToken');
            const settings = {
                method: 'GET',
                headers: { 'authorization': `${token}` }
            };
            
            const response = await fetch(`http://${apiHost}/users/admins`, settings)
            .then(response => response.json());

            return (await response) as getResponse;

        } catch (error) {
            return rejectWithValue('Не удалось получить список администраторов');
        }         
    }
);

export const getAdminInfo = createAsyncThunk<IUser, number, {rejectValue: string}>(
    'user/getAdminInfo',
    async (id, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('userToken');
            const settings = {
                method: 'GET',
                headers: { 'authorization': `${token}` }
            };
            
            const response = await fetch(`http://${apiHost}/users/${id}`, settings)
            .then(response => response.json());

            return (await response) as IUser;

        } catch (error) {
            return rejectWithValue('Не удалось получить список администраторов');
        }         
    }
);

type updateRoleRequest = {
    id: number;
    role: string;
};

export const updateRole = createAsyncThunk<any, updateRoleRequest, {rejectValue: string}>(
    'user/updateRole',
    async ({id, role}, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('userToken');
            const settings = {
                method: 'PUT',
                headers: { 'authorization': `${token}` },
                params: {
                    roleName: role
                }
            };
            
            const response = await fetch(`http://${apiHost}/users/${id}/role`, settings);
            
            if (!response.ok) {
                throw new Error("Server error.");
            };

        } catch (error) {
            return rejectWithValue('Не удалось изменить роль');
        }         
    }
);

export const resetRole = createAsyncThunk<any, number, {rejectValue: string}>(
    'user/resetRole',
    async (id, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('userToken');
            const settings = {
                method: 'DELETE',
                headers: { 'authorization': `${token}` }
            };
            
            const response = await fetch(`http://${apiHost}/users/${id}/role`, settings);
            
            if (!response.ok) {
                throw new Error("Server error.");
            };

        } catch (error) {
            return rejectWithValue('Не удалось удалить роль');
        }         
    }
);

export const updateAvatar = createAsyncThunk<any, FormData, {rejectValue: string}>(
    'user/updateAvatar',
    async (photo, {rejectWithValue, dispatch}) => {
        try {
            const token = localStorage.getItem('userToken');
            const settings = {
                method: 'POST',
                headers: { 'authorization': `${token}` },
                body: photo
            };
            
            const response = await fetch(`http://${apiHost}/users/current/avatar`, settings);
            
            if (!response.ok) {
                throw new Error("Server error.");
            };

        } catch (error) {
            return rejectWithValue('Не удалось изменить аватар');
        }         
    }
);