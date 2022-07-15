import React from 'react'
import { Product } from './product'

export const ProducList = ({ products, columns }) => {
  const smColumns = Math.round(columns / 2);
  const xlColumns = columns * 2;

  return (
    <div className="max-w-2xl mx-auto py-5 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className={`grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-${smColumns} lg:grid-cols-${columns} xl:gap-x-${xlColumns}`}>
        {products.map((product) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </div>
    </div>
  )
}
