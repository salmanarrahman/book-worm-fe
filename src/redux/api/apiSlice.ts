import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (builder) => ({
        getBooks : builder.query({
            query: ()=> '/book'
        }),
     singleBook:   builder.query({
        query: (id) => `/book/${id}`
     }),
     getComments: builder.query({
        query: (id) => `/comment/${id}`
     }),
     postComment: builder.mutation({
        query: ({id,data}) => ({
            url: `/comment/${id}`,
            method: 'POST',
            body: data
        })
     })
    })
})

export const {useGetBooksQuery,useSingleBookQuery,useGetCommentsQuery} = api