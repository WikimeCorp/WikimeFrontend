import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import type { IAnime } from '../types/IAnime';


const apiHost = process.env.REACT_APP_API_HOST;
const apiPort = process.env.REACT_APP_API_PORT;

type AnimeRespone = IAnime[];

export const animeAPI = createApi({
    reducerPath: 'animeAPI',
    baseQuery: fetchBaseQuery({baseUrl: `http://${apiHost}:${apiPort}/anime/`}),
    tagTypes: ['Anime', 'Popular', 'IdsPopular'],
    endpoints: (build) => ({
        getIds: build.query<number[], number | void>({
            query: (count: number = 16) => ({
                url: `popular`,
                params: {
                    count: count
                }
            }),
            providesTags: ['IdsPopular']
        }),
        getPopularAnimes: build.query<AnimeRespone, number[]>({
            query: (ids: number[]) => {
                const args = new URLSearchParams(ids.map(s => ['id',`${s}`]));
                return {
                    url: `list`,
                    params: args, 
                }
            },
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }) => ({ type: 'Popular' as const, id })),
                    { type: 'Popular', id: 'LIST' },
                ]
                : [{ type: 'Popular', id: 'LIST' }],
        }),

        getAnimes: build.query<AnimeRespone, void>({
            query: () => 'anime',
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }) => ({ type: 'Anime' as const, id })),
                    { type: 'Anime', id: 'LIST' },
                  ]
                : [{ type: 'Anime', id: 'LIST' }],
        }),

        addAnime: build.mutation<IAnime, Partial<IAnime>>({
            query: (body) => ({
                url: `anime`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Anime', id: 'LIST' }],
        }),

        getAnime: build.query<IAnime, string>({
            query: (id) => `anime/${id}`,
            providesTags: (result, error, id) => [{ type: 'Anime', id}],
        }),

        updateAnime: build.mutation<void, Pick<IAnime, 'id'> & Partial<IAnime>>({
           query: ({ id, ...patch }) => ({
            url: `anime/${id}`,
            method: 'PUT',
            body: patch,
           }),
           invalidatesTags: (result, error, { id }) => [{ type: 'Anime', id }], 
        }),

        deleteAnime: build.mutation<{ succes: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `anime/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, id) => [{ type: 'Anime', id }],
        }),

        getPoster: build.query<string, string>({
            query: (id) => `anime/${id}/poster`,
            providesTags: (result, error, id) => [{ type: 'Anime', id}],
        }),

        updatePoster: build.mutation<void, Pick<IAnime, 'id'> & Partial<IAnime>>({
            query: ({ id, ...patch }) => ({
             url: `anime/${id}/poster`,
             method: 'PUT',
             body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Anime', id }], 
         }),

         getImgs: build.query<string[], string>({
            query: (id) => `anime/${id}/imgs`,
            providesTags: (result, error, id) => [{ type: 'Anime', id}],
        }),

        addImgs: build.mutation<void, Pick<IAnime, 'id'> & Partial<IAnime>>({
            query: ({ id, ...patch }) => ({
             url: `anime/${id}/imgs`,
             method: 'PUT',
             body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Anime', id }], 
         }),
    }),
});

export const {
    useGetIdsQuery,
    useGetPopularAnimesQuery,
    useGetAnimesQuery,
    useGetAnimeQuery,
    useAddAnimeMutation,
    useUpdateAnimeMutation,
    useDeleteAnimeMutation,
    useGetPosterQuery,
    useUpdatePosterMutation,
    useGetImgsQuery
} = animeAPI;