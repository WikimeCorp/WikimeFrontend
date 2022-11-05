import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import type { IUser } from '../types/IUser';


export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    tagTypes: ['User'],
    endpoints: (build) => ({

        getUser: build.query<IUser, string>({
            query: (id) => `users/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id}],
        }),
    }),
});

export const {
    useGetUserQuery,
} = usersAPI;