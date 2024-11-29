import React, { useState, useEffect } from 'react';
import { useSearchProductQuery } from '../store/apiquery/productApiSlice';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import SearchCategory from './SearchCategory';
import { ProductType } from './ProductCart';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<ProductType[]>([]);

  // Fetch products based on the search query using the API
  const { data: results, isLoading, isError } = useSearchProductQuery(searchQuery, {
    skip: !searchQuery, // Only fetch if search query is not empty
  });

  useEffect(() => {
    if (results) {
      setProducts(results.data); // Update the products state when results change
    }
  }, [results]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query on input change
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
  };

  return (
    <div className="w-100 p-4 text-black bg-white fd-hover-border-primary border border-1">
      <h5 className="fw-bold">Search</h5>

      {/* Search input form */}
      <form onSubmit={handleSearchSubmit} className="w-100 d-flex">
        <div className="w-75">
          <input
            type="text"
            name="searchquery"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Here ..."
            className="p-3 border border-1 rounded-0 w-100"
          />
        </div>
        <div className="w-25">
          <button type="submit" className="btn btn-outline-dark rounded-0 py-3 px-4">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </form>

      {/* Display search results */}
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <div>Error loading products</div>
      ) : searchQuery && products.length > 0 ? (
        <div className="search-list my-3">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="text-dark d-block fd-hover-bg-primary w-100 fw-bold opacity-75 p-2 border border-1"
            >
              <span className="me-4">{product.name}</span>
              <span>${product.price}</span>
            </Link>
          ))}
        </div>
      ) : searchQuery ? (
        <div>No products found</div>
      ) : null}

      {/* Display recent and popular searches */}
      {/* <div className="search-category opacity-75 mt-4">
        <div className="recent-search">
          <h6>Recent Searches</h6>
          <SearchCategory type="recent" />
        </div>
        <div className="popular-search my-5">
          <h6>Popular Searches</h6>
          <SearchCategory type="popular" />
        </div>
      </div> */}
    </div>
  );
};

export default SearchBar;
