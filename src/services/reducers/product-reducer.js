import { type as actionTypes } from "../constants/product-constant";

const initialState = {
  products: []
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        products: saveOrUpdate(action.payload, state.products),
      };
    case actionTypes.REMOVE_PRODUCT_OUT_OF_CART:
      return {
        ...state,
        products: remove(action.payload, state.products),
      };
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        products: [],
      };
    case actionTypes.REMOVE_PRODUCT_OUT_OF_CART:
      return {
        ...state,
        products: remove(action.payload, state.products),
      };
    default:
      return state;
  }
};

const saveOrUpdate = (newProduct, products) => {
  const index = products.findIndex(p =>
    p.id === newProduct.id &&
    p.color === newProduct.color &&
    p.color === newProduct.color)

  if (index === -1) {
    products.push(newProduct);
  } else {
    products[index] = newProduct;
  }

  return [...products];
}

const remove = (removeProduct, products) => {
  return products.filter(p => p.id !== removeProduct.id ||
    p.color !== removeProduct.color ||
    p.size !== removeProduct.size);
}