import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, inject_headers } from '../../Utils/Generals';

export const usersApiSlice = createApi({

    reducerPath: 'api/users',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, headers: inject_headers() }),
    tagTypes: ['Users'],

    endpoints: (builder) => ({

        getAllUsers: builder.query(({
            query: () => '/user',
            providesTags: ['Users']
        })),
        
        getUser: builder.query({  // 'any' can be replaced by the actual type of user
            query: () => ({
                url: `/user`,
                method: 'GET'
            }),
            // providesTags: ['Users'],
        }),

     
    
        getStartistics: builder.query({
            query: () => '/statistics',
        }),

        createUser: builder.mutation({
            query: (user) => ({
                url: `/user/create`,
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Users']
        }),

        updateUser: builder.mutation({
            query: (data) => ({
                url: 'user/edit',
                method: 'POST',
                body: { _method: 'patch', ...data },
            }),
            invalidatesTags: ['Users']
        }),

        deleteUser: builder.mutation({
            query: (id: number) => ({
                url: '/user/delete',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: ['Users']
        })
    })
})


export const {
    useGetAllUsersQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useCreateUserMutation,
    useDeleteUserMutation,
    useGetStartisticsQuery
} = usersApiSlice;
