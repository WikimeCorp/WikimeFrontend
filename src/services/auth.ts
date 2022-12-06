import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../types/IUser';


const apiHost = process.env.REACT_APP_API_HOST;
const apiPort = process.env.REACT_APP_API_PORT;

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${apiHost}:${apiPort}/`,
        prepareHeaders: headers => {
            const token = localStorage.getItem('userToken');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            };
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUser: builder.query<IUser, void>({
            query: () => `/user`
        }),
  }),
})

export const { useGetUserQuery } = authAPI;