import {type as actionTypes} from '../constants/product-constant';

export const addToCartRequest = (formData) => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_CART,
    payload: formData
  };
};

export const removeOfOutCartRequest = (formData) => {
  return {
    type: actionTypes.REMOVE_PRODUCT_OUT_OF_CART,
    payload: formData
  };
}

export const clearCartRequest = () => {
  return {
    type: actionTypes.CLEAR_CART,
  };
};