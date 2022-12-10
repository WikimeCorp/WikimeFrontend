import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../types/IUser";
import { getUrlParams, removeParamsFromUrl } from "../../utils/urlUtils";
import { RootState } from "../store";

const authEndpoint = process.env.REACT_APP_VKAUTH_URI;
const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const littleBoyPort = process.env.REACT_APP_LITTLE_BOY_PORT;
const apiHost = process.env.REACT_APP_API_HOST;
const apiPort = process.env.REACT_APP_API_PORT;

export const getAuthorizeCodeHref = (): string => {
    const display = 'page';
    const response_type = 'code';
    const state = 4194308;
    return `${authEndpoint}/authorize?client_id=${clientId}&display=${display}&redirect_uri=${redirectUri}&response_type=${response_type}&v=5.120&state=${state}`;
};

export const getCode = () => {
    const urlParams = getUrlParams();
    const code: string = urlParams.code;
    removeParamsFromUrl(); 
    return { payload: code };
};

type VkResponse = {
    token: string,
};

export const getAccessToken = createAsyncThunk<
    VkResponse, 
    void, 
    {state: RootState, rejectValue: string}
>(
    'auth/access_token',
    async (_, { getState, rejectWithValue}) => {
        try {
            const code = getState().VkAuth.code;            
            const response = await fetch(`http://localhost:${littleBoyPort}/access_token?code=${code}`);            
            return (await response.json()) as VkResponse;    
        } catch (error) {
            return rejectWithValue('Не удалось получить Access Token');
        }                
    }
);

type JWTResponse = {
    AuthToken: string;
};

export const getJWToken = createAsyncThunk<JWTResponse, void, {state: RootState, rejectValue: string}>(
    'auth/JWToken',
    async function(_, { getState, rejectWithValue }) {
        try {
            const accessToken = getState().VkAuth.accessToken;
            const settings = {
                method: 'POST',
                body: JSON.stringify({
                    AuthToken: accessToken,
                })
            };

            const response = await fetch(`http://${apiHost}/auth/vk`, settings);
            return (await response.json()) as JWTResponse;  
        } catch (error) {
            return rejectWithValue('Не удалось получить JWT');
        }        
    }
);

type ErrorResponse = {
    error_message: string;
    error: number;
};

export const getUserInfo = createAsyncThunk<
    IUser, 
    void, 
    {state: RootState, rejectValue: ErrorResponse}
>(
    'auth/userInfo',
    async (_, {}) => {
        const token = localStorage.getItem('userToken');
        const settings = {
            method: 'GET',
            headers: { 'authorization': `${token}` },
        };
        
        const response = await fetch(`http://${apiHost}/users/current`, settings).then(response => response.json());

        return (await response) as IUser;          
    }
);
