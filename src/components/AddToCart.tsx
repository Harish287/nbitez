import React from 'react';
import { ProductType } from './ProductCart';
import { addToShoppingCart } from '../store/productSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';

const AddToCart = ({ product, classSup = '', divClass = '' }: { product: ProductType, classSup?: string, divClass?: string }) => {
  
  const dispatch = useAppDispatch();
  const exist: ProductType[] = useAppSelector((state) => state.productCart);
  const isExistInCart = exist.find((stateProduct) => stateProduct.id == product.id);

  return (
    <>
      {isExistInCart ? (
        <div className={divClass}>
          <span className={`fd-btn rounded-3 text-center ${classSup}`}>
            <i className="bi bi-check-circle"></i>Added
          </span>
        </div>
      ) : (
        <div className={divClass}>
          {/* Replace anchor tag with button for the "Add to Cart" action */}
          <button
            className={`fd-btn rounded-3 text-center ${classSup}`}
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              dispatch(addToShoppingCart(product));
            }}
          >
            ADD TO CART
          </button>
        </div>
      )}
    </>
  );
};

export default AddToCart;
