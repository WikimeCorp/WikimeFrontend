import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const articleAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/'}),
    endpoints: (build) => ({
        fetchAllArticles: build.query({
            query: () => ({
                url: "/photos"
            })
        })
    })
})