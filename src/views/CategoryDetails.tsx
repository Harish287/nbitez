import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryQuery } from '../store/apiquery/categoryApiSlice';
import { useGetProductsByCategoryQuery } from '../store/apiquery/productApiSlice';

// Define the product interface
interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: string;
  old_price: string;
  reduction: number;
  status: string;
  is_featured: number;
  categorie_id: number;
  child_cat_id: number | null;
  brand_id: number;
  reviews: string;
  created_at: string;
  updated_at: string;
}

const CategoryDetails: React.FC = () => {
  const { id } = useParams();
  const categoryId = Number(id);  // Extract category ID from URL params

  // Fetch category details and products using category ID
  const { data: category, isLoading: isCategoryLoading, isError: isCategoryError } = useGetCategoryQuery(categoryId);
  const { data: products, isLoading: isProductsLoading, isError: isProductsError } = useGetProductsByCategoryQuery({ categoryId });

  if (isCategoryLoading || isProductsLoading) {
    return <p>Loading...</p>;
  }

  if (isCategoryError) {
    return <p>Error loading category data.</p>;
  }

  if (isProductsError) {
    return <p>Error loading products for this category.</p>;
  }

  // Check if category and products are available
  if (!category) {
    return <p>Category details not found.</p>;
  }

  if (!products || products.length === 0) {
    return <p>No products available for this category.</p>;
  }

  return (
    <div>
      <div>
        <h2>{category.title}</h2>
        <p>{category.summary}</p>
      </div>

      <div>
        <h3>Products</h3>
        <ul>
          {products.map((product: Product) => (
            <li key={product.id}>
              <h4>{product.name}</h4>
              <div dangerouslySetInnerHTML={{ __html: product.desc }} />
              <p>Price: ${product.price}</p>
              <p>Old Price: ${product.old_price}</p>
              <p>Discount: ${product.reduction}</p>
              <p>Status: {product.status}</p>
              <p>Reviews: {product.reviews}</p>
              {product.img && <img src={product.img} alt={product.name} style={{ width: '200px', height: 'auto' }} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryDetails;
