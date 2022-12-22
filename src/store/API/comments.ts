import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { TComment } from '../../types/TComment';
import { NewComment } from '../../types/NewComment';

const apiHost = process.env.REACT_APP_API_HOST;

export const commentsAPI = createApi({
    reducerPath: 'commentsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `http://${apiHost}` }),
    tagTypes: ['Comments'],
    endpoints: (build) => ({
        getComments: build.query<TComment[], number>({
            query: (id: number) => `/anime/${id}/comments`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Comments' as const,
                              id,
                          })),
                          { type: 'Comments', id: 'LIST' },
                      ]
                    : [{ type: 'Comments', id: 'LIST' }],
        }),

        getComment: build.query<string[], string>({
            query: (id: string) => `/comments/${id}`,
            providesTags: (result, error, id) => [{ type: 'Comments', id }],
        }),

        addComment: build.mutation<TComment, NewComment>({
            query: (body) => {
                const token = localStorage.getItem('userToken');
                return {
                    url: `/comments`,
                    method: 'POST',
                    headers: { authorization: `${token}` },
                    body,
                };
            },
            invalidatesTags: [{ type: 'Comments', id: 'LIST' }],
        }),

        delComment: build.mutation<{ success: boolean; id: number }, string>({
            query(id) {
                const token = localStorage.getItem('userToken');
                return {
                    url: `/comments/${id}`,
                    method: 'DELETE',
                    headers: { authorization: `${token}` },
                };
            },
            invalidatesTags: (result, error, id) => [{ type: 'Comments', id }],
        }),
    }),
});

export const { useAddCommentMutation, useDelCommentMutation, useGetCommentQuery, useGetCommentsQuery } = commentsAPI;
