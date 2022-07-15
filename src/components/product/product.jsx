import React from 'react'
import { Star } from '../star/star'
import { Link } from 'react-router-dom'
import { currencyFomatter } from '../../converter/currency-fomatter'

export const Product = ({ product }) => {
  let finalPrices = product.price;
  if (product.discount > 0) {
    finalPrices = Math.ceil(product.price - (product.price * product.discount) / 100);
  }

  return (
    <div className="group relative">
      <div className="scale-100 transition-all duration-400 hover:scale-110 border rounded-md h-full">
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-t-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
          <img
            src={product.image.url}
            alt={product.image.name}
            className="w-full h-full lg:w-full lg:h-full object-cover object-center"
          />
          {product.discount && (
            <div className="absolute top-0 left-0 text-white text-xl leading-4 text-right mt-2 mr-2">
              <div className="bg-red-600 w-full h-full p-2 rounded-r-md">
                Giảm {product.discount}%
              </div>
            </div>
          )}
        </div>
        <div className="px-5 py-3 flex justify-between w-full">
          <div className='truncate flex space-x-5 w-full'>
            <h3 className="text-gray-700 truncate text-xl w-full">
              <Link to={`/product/${product.id}`} className='space-y-3'>
                <span aria-hidden="true" className="absolute inset-0" ></span>
                {product.name}
                <div className='flex items-center justify-between'>
                  <Star rate={product.rating}></Star>
                  <p className="font-medium text-gray-900">{currencyFomatter(finalPrices)}</p>
                </div>
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}
