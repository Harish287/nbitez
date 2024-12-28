import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ProductType } from '../../components/ProductCart';
import { BASE_URL, inject_headers } from '../../Utils/Generals';

export const productApiSlice = createApi({

    reducerPath: 'api/products',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, headers: inject_headers() }),
    tagTypes: ['Products'],

    endpoints: (builder) => ({


        getProductsByCategory: builder.query({
            query: ({ categoryId }: { categoryId: number }) => `/products?categoryId=${categoryId}`,
            providesTags: ['Products'],
        }),

        getAllProducts: builder.query(({
            query: () => '/product',
            providesTags: ['Products']
        })),


        getBlog: builder.query({
            query: () => 'blog',
            // providesTags: ['blogs']
        }),


        getSliderOffer: builder.query({
            query: () => 'slideroffer',
            // providesTags: ['blogs']
        }),

        getCheckout: builder.mutation({
            query: (data) => ({
                url: 'Command',
                method: 'POST',
                body: data,
            }),
            // invalidatesTags: ['checkouts']
        }),

        getProduct: builder.query({
            query: (id: string) => `/product/${id}`,
            providesTags: ['Products']
        }),

        getUserAddress: builder.query({ 
            query: (id: string) => `/shippingaddress/${id}`,
            providesTags: ['Products']
        }),

        searchProduct: builder.query({
            query: (query: string) => `/product/search/${query}`,
            providesTags: ['Products']
        }),

        getRandomProduct: builder.query({
            query: () => `/product/types/random`,
            providesTags: ['Products']
        }),

        getBestProducts: builder.query({
            query: () => `/product/types/best-sellers`,
            providesTags: ['Products']
        }),

        createProduct: builder.mutation({
            query: (product) => ({
                url: `/product/create`,
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Products']
        }),

        updateProduct: builder.mutation({
            query: (data) => ({
                url: 'product/edit',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Products']
        }),

        deleteProduct: builder.mutation({
            query: (id: number) => ({
                url: '/product/delete',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: ['Products']
        })
    })
})


export const {
    useGetAllProductsQuery,
    useGetBlogQuery,
    useGetProductQuery,
    useSearchProductQuery,
    useGetRandomProductQuery,
    useGetBestProductsQuery,
    useUpdateProductMutation,
    useGetCheckoutMutation,
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetProductsByCategoryQuery,
    useGetUserAddressQuery,
    useGetSliderOfferQuery
} = productApiSlice;
