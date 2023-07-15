import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    tagTypes:["fetch-comment"],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (builder) => ({
        getBooks : builder.query({
            query: ()=> '/book'
        }),
     singleBook:   builder.query({
        query: (id) => `/book/${id}`
     }),
     getComments: builder.query({
        query: (id) => `/comment/${id}`,
        providesTags:['fetch-comment'],

     }),
     postComment: builder.mutation({
        query: ({id,data}) => ({
            url: `/comment/${id}`,
            method: 'POST',
            body: data
        }),
        invalidatesTags:['fetch-comment']
     })
    })
})

export const {usePostCommentMutation,useGetBooksQuery,useSingleBookQuery,useGetCommentsQuery} = api