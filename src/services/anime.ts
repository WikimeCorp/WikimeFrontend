import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import type { IAnime } from '../types/IAnime';


type AnimeRespone = IAnime[];

export const animeAPI = createApi({
    reducerPath: 'animeAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    tagTypes: ['Anime'],
    endpoints: (build) => ({

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
    useGetAnimesQuery,
    useGetAnimeQuery,
    useAddAnimeMutation,
    useUpdateAnimeMutation,
    useDeleteAnimeMutation,
    useGetPosterQuery,
    useUpdatePosterMutation,
    useGetImgsQuery
} = animeAPI;