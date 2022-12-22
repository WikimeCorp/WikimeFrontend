import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import type { IAnime } from '../../types/IAnime';

const apiHost = process.env.REACT_APP_API_HOST;

type ParamsIds = {
    sortBy: string;
    genres: string[];
};

type RatingBody = {
    id: number;
    rating: number;
};

type ImgsBody = {
    imgFile: FormData;
};

export type addAnimeResponse = {
    animeId: number;
};

export const animeAPI = createApi({
    reducerPath: 'animeAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `http://${apiHost}/anime` }),
    tagTypes: ['Anime', 'Ids', 'Popular', 'IdsPopular', 'IdsSearch'],
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
        getPopularAnimes: build.query<IAnime[], number[]>({
            query: (ids: number[]) => {
                const args = new URLSearchParams(ids.map((s) => ['id', `${s}`]));

                return {
                    url: `/list`,
                    params: args
                };
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({
                            type: 'Popular' as const,
                            id
                        })),
                        { type: 'Popular', id: 'LIST' }
                    ]
                    : [{ type: 'Popular', id: 'LIST' }]
        }),

        getIds: build.query<number[], ParamsIds>({
            query: (paramsIds: ParamsIds) => {
                const args =
                    paramsIds.genres.length > 0
                        ? {
                            sortBy: paramsIds.sortBy,
                            genres: paramsIds.genres.join(',')
                        }
                        : { sortBy: paramsIds.sortBy };

                return {
                    url: ``,
                    params: args
                };
            },
            providesTags: ['Ids']
        }),
        getAnimes: build.query<IAnime[], number[]>({
            query: (ids: number[]) => {
                const args = new URLSearchParams(ids.map((s) => ['id', `${s}`]));
                return {
                    url: `/list`,
                    params: args
                };
            },
            providesTags: (result, error, ids) =>
                result
                    ? [
                        ...result.map(({ id }) => ({
                            type: 'Anime' as const,
                            id
                        })),
                        { type: 'Anime', id: 'PARTIAL-LIST' }
                    ]
                    : [{ type: 'Anime', id: 'PARTIAL-LIST' }]
        }),

        addAnime: build.mutation<addAnimeResponse, Partial<IAnime>>({
            query: (body) => {
                const token = localStorage.getItem('userToken');
                return {
                    url: ``,
                    method: 'POST',
                    headers: { authorization: `${token}` },
                    body
                };
            },
            invalidatesTags: [{ type: 'Anime', id: 'LIST' }]
        }),

        getAnime: build.query<IAnime, string>({
            query: (id) => `${id}`,
            providesTags: (result, error, id) => [{ type: 'Anime', id }]
        }),

        updateAnime: build.mutation<void, Pick<IAnime, 'id'> & Partial<IAnime>>({
            query: ({ id, ...patch }) => {
                const token = localStorage.getItem('userToken');
                return {
                    url: `${id}`,
                    method: 'PUT',
                    headers: { authorization: `${token}` },
                    body: patch
                };
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Anime', id }]
        }),

        addPoster: build.mutation<void, Pick<IAnime, 'id'> & ImgsBody>({
            query: ({ id, ...patch }) => {
                const token = localStorage.getItem('userToken');
                return {
                    url: `${id}/poster`,
                    method: 'POST',
                    headers: { authorization: `${token}` },
                    body: patch.imgFile
                };
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Anime', id }]
        }),

        addImg: build.mutation<void, Pick<IAnime, 'id'> & ImgsBody>({
            query: ({ id, ...patch }) => {
                const token = localStorage.getItem('userToken');
                return {
                    url: `${id}/images`,
                    method: 'POST',
                    headers: { authorization: `${token}` },
                    body: patch.imgFile
                };
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Anime', id }]
        }),

        addRating: build.mutation<IAnime, RatingBody>({
            query: ({ id, rating }) => {
                const token = localStorage.getItem('userToken');
                return {
                    url: `${id}/rating`,
                    method: 'POST',
                    headers: { authorization: `${token}` },
                    body: JSON.stringify({
                        rating: rating
                    })
                };
            },
            invalidatesTags: [{ type: 'Anime', id: 'LIST' }]
        }),

        getSearchIds: build.query<number[], string>({
            query: (search: string) => ({
                url: ``,
                params: {
                    search: search
                }
            }),
            providesTags: ['IdsSearch']
        })
    })
});

export const {
    useGetIdsPopularQuery,
    useGetPopularAnimesQuery,
    useGetIdsQuery,
    useGetAnimesQuery,
    useGetAnimeQuery,
    useAddAnimeMutation,
    useUpdateAnimeMutation,
    useAddPosterMutation,
    useAddImgMutation,
    useAddRatingMutation,
    useGetSearchIdsQuery
} = animeAPI;
