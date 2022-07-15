import React from 'react'
import { removeOfOutCartRequest } from '../../services/actions/product-action';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { currencyFomatter } from '../../converter/currency-fomatter';
import { colorConverter } from '../../converter/color-converter';

export const ProductsCart = ({products}) => {
  const dispatch = useDispatch();

  const handleRemove = (e) => {
    dispatch(removeOfOutCartRequest({
      id: e.target.getAttribute('product-id'),
      color: e.target.getAttribute('product-color'),
      size: e.target.getAttribute('product-size')
    }));
  }

  return products && products.map((product, index) => {
    let price = ((product.price - product.discountPrice) * product.quantity);

    return (
      <li key={product.id + index.toString()} className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={product.image}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <Link to={`/product/${product.id}` || ''}> {product.name} </Link>
              </h3>
              <p className="ml-4">{currencyFomatter(price)}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">{colorConverter(product.color)} | {product.size}</p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">Số lượng {product.quantity}</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-teal-600 hover:text-teal-500"
                product-color={product.color}
                product-size={product.size}
                product-id={product.id}
                onClick={(e) => handleRemove(e)}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </li>
    )
  })
}
