import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import type { IAnime } from '../types/IAnime';


const apiHost = process.env.REACT_APP_API_HOST;
const apiPort = process.env.REACT_APP_API_PORT;

type AnimeRespone = IAnime[];

interface ParamsIds {
    sortBy: string;
    genres: string[];
};

export const animeAPI = createApi({
    reducerPath: 'animeAPI',
    baseQuery: fetchBaseQuery({baseUrl: `http://${apiHost}/anime`}),
    tagTypes: ['Anime', 'Ids', 'Popular', 'IdsPopular'],
    endpoints: (build) => ({
        getIdsPopular: build.query<number[], number | void>({
            query: (count: number = 16) => ({
                url: `/popular`,
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
                    url: `/list`,
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

        getIds: build.query<number[], ParamsIds>({
            query: (paramsIds: ParamsIds) => {

                const args = paramsIds.genres.length > 0 ? 
                    { sortBy: paramsIds.sortBy, genres: paramsIds.genres.join(',')}
                    : { sortBy: paramsIds.sortBy };

                return {
                    url: ``,
                    params: args,
                }
            },
            providesTags: ['Ids']
        }),
        getAnimes: build.query<AnimeRespone, number[]>({
            query: (ids: number[]) => {
                const args = new URLSearchParams(ids.map(s => ['id',`${s}`]));
                return {
                    url: `/list`,
                    params: args, 
                }
            },
            providesTags: (result, error, ids) =>
                result
                ? [
                    ...result.map(({ id }) => ({ type: 'Anime' as const, id })),
                    { type: 'Anime', id: 'LIST' },
                  ]
                : [{ type: 'Anime', id: 'LIST' }],
        }),

        addAnime: build.mutation<IAnime, Partial<IAnime>>({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Anime', id: 'LIST' }],
        }),

        getAnime: build.query<IAnime, string>({
            query: (id) => `${id}`,
            providesTags: (result, error, id) => [{ type: 'Anime', id}],
        }),

        updateAnime: build.mutation<void, Pick<IAnime, 'id'> & Partial<IAnime>>({
           query: ({ id, ...patch }) => ({
            url: `${id}`,
            method: 'PUT',
            body: patch,
           }),
           invalidatesTags: (result, error, { id }) => [{ type: 'Anime', id }], 
        }),

        deleteAnime: build.mutation<{ succes: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, id) => [{ type: 'Anime', id }],
        }),

        getPoster: build.query<string, string>({
            query: (id) => `${id}/poster`,
            providesTags: (result, error, id) => [{ type: 'Anime', id}],
        }),

        updatePoster: build.mutation<void, Pick<IAnime, 'id'> & Partial<IAnime>>({
            query: ({ id, ...patch }) => ({
             url: `${id}/poster`,
             method: 'PUT',
             body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Anime', id }], 
         }),

         getImgs: build.query<string[], string>({
            query: (id) => `${id}/imgs`,
            providesTags: (result, error, id) => [{ type: 'Anime', id}],
        }),

        addImgs: build.mutation<void, Pick<IAnime, 'id'> & Partial<IAnime>>({
            query: ({ id, ...patch }) => ({
             url: `${id}/imgs`,
             method: 'PUT',
             body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Anime', id }], 
         }),
    }),
});

export const {
    useGetIdsPopularQuery,
    useGetPopularAnimesQuery,
    useGetIdsQuery,
    useGetAnimesQuery,
    useGetAnimeQuery,
    useAddAnimeMutation,
    useUpdateAnimeMutation,
    useDeleteAnimeMutation,
    useGetPosterQuery,
    useUpdatePosterMutation,
    useGetImgsQuery
} = animeAPI;