import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { BASE_URL, inject_headers } from '../../Utils/Generals';

export const categoryApiSlice = createApi({
    
    reducerPath : 'api/categories',
    baseQuery : fetchBaseQuery({baseUrl : BASE_URL, headers : inject_headers()}),
    tagTypes : ['Categories'],

    endpoints : (builder) => ({

        getCategory: builder.query({
            query: (categoryId: number) => `/category/${categoryId}`,
            providesTags: ['Categories'],
          }),
          getAllCategories: builder.query({
            query: () => '/category',
            providesTags: ['Categories'],
          }),

        createCategory: builder.mutation({
            query : (category) => ({
                url : `/category/create`,
                method : 'POST',
                body : category,
            }),
           invalidatesTags : ['Categories']
        }),

        updateCategory: builder.mutation({
            query : (data) => ({
                url : 'category/edit',
                method : 'POST',
                body : data,
            }),
            invalidatesTags : ['Categories']
        }),

        deleteCategory: builder.mutation({
            query : (id : number) => ({
                url : '/category/delete',
                method : 'DELETE',
                body : {id}
            }),
            invalidatesTags : ['Categories']
        })
    })
})


export const {
    useGetAllCategoriesQuery,
    useGetCategoryQuery,
    useUpdateCategoryMutation,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
 } = categoryApiSlice;
