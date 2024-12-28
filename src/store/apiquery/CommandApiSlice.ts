import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, inject_headers } from '../../Utils/Generals';

export const commandApiSlice = createApi({

    reducerPath: 'api/commands',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, headers: inject_headers() }),
    tagTypes: ['Commands'],

    endpoints: (builder) => ({

        getAllCommands: builder.query(({
            query: () => '/Command',
            providesTags: ['Commands']
        })),

        getCommand: builder.query({
            query: (id) => `/order/${id}`,
            // providesTags : ['Commands']
        }),



        createCommand: builder.mutation({
            query: (Command) => ({
                url: `/Command `,
                method: 'POST',
                body: Command,
            }),
            invalidatesTags: ['Commands']
        }),

        updateCommand: builder.mutation({
            query: (data) => ({
                url: 'Command/edit',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Commands']
        }),

        deleteCommand: builder.mutation({
            query: (id: number) => ({
                url: '/Command/delete',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: ['Commands']
        })
    })
})


export const {
    useGetAllCommandsQuery,
    useGetCommandQuery,

    useUpdateCommandMutation,
    useCreateCommandMutation,
    useDeleteCommandMutation,
} = commandApiSlice;
