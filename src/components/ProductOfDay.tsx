import React from 'react';
import DateCount from './DateCount';
import NumberCount from './NumberCount';
import Reviews from './Reviews';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';
import { useGetRandomProductQuery } from '../store/apiquery/productApiSlice';
import Spinner from './Spinner';
import DOMPurify from 'dompurify'; // Import DOMPurify

const ProductOfDay = () => {
    // Fetch product data
    const { data: product, isLoading, isError } = useGetRandomProductQuery("");

    // Function to sanitize HTML content
    const sanitizeHTML = (html: string | undefined) => {
        return html ? DOMPurify.sanitize(html) : ''; // Sanitize the HTML
    };

    return (
        <>
            {
                !isLoading && !isError && product ? (
                    <div className="row">
                        <div className="col-12 col-lg-3">
                            <Link to={`/product/${product.data[0].id}`}>
                                <img src={product.data[0].img} alt={product.data[0].name} className="w-100 h-100" />
                            </Link>
                        </div>
                        <div className="col-12 col-lg-9">
                            <DateCount />
                            <Link to={`/product/${product.data[0].id}`} className="product-name my-2 fw-bold text-dark">{product.data[0].name}</Link>
                            <div className="d-flex gap-1 mt-2">
                                <h3 className="fd-color-primary fw-bold">₹{product.data[0].price}</h3>
                                <h6 className="align-self-end" style={{ textDecoration: "line-through" }}>₹{product.data[0].old_price}</h6>
                            </div>
                            <div className="my-3 d-flex gap-2">
                                <Reviews rating={product.data[0].reviews} />
                                <span className='fd-color-primary'>(25 Reviews)</span>
                            </div>
                            <div className="product-desc fw-bold opacity-75">
                                {/* Using DOMPurify to safely render the product description */}
                                {/* <p dangerouslySetInnerHTML={{ __html: sanitizeHTML(product.data[0].desc) }} /> */}
                            </div>
                            <div className='d-flex gap-2'>
                                <NumberCount product={product.data[0]} min={1} />
                                <AddToCart product={product.data[0]} divClass='align-self-center' />
                            </div>
                        </div>
                    </div>
                ) : (
                    <Spinner />
                )
            }
        </>
    );
};

export default ProductOfDay;
