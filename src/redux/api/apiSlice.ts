import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    tagTypes:["fetch-comment"],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (builder) => ({
        getBooks : builder.query({
            query: ()=> '/book',
            providesTags:['fetch-comment']

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
     }),
     updateBook: builder.mutation({
        query: ({id,data}) => ({
            url: `/book/update/${id}`,
            method: 'POST',
            body: data
        }),
        invalidatesTags:['fetch-comment']
     }),
     addBook: builder.mutation({
        query: ({data}) => ({
            url: `/book`,
            method: 'POST',
            body: data
        }),
     }),
   
     deleteBook: builder.mutation({
        query: (id) => ({
            url: `/book/${id}`,
            method: 'DELETE'
        }),
     }),

    })
})

export const {useUpdateBookMutation,useDeleteBookMutation,useAddBookMutation,usePostCommentMutation,useGetBooksQuery,useSingleBookQuery,useGetCommentsQuery} = api