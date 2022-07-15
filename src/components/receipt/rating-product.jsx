import { useState } from 'react'
import { Link } from 'react-router-dom'
import { colorConverter } from '../../converter/color-converter'
import { currencyFomatter } from '../../converter/currency-fomatter'
import { Star } from '../star/star'

export const RatingProduct = ({ item, saveRating }) => {
  let formData = [];

  const handleRating = (data) => {
    formData = [...formData, { ...data, receipt: item._id }];
  }

  const onRating = () => {
    saveRating(formData);
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Thông tin hóa đơn</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Mã hóa đơn: {item._id}</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-6">
              <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {item.products && item.products.map((product) => {
                  return (
                    <li key={product.id} className="pl-3 pr-4 py-3 flex text-sm sm:grid sm:grid-cols-4">
                      <div className="ml-2 flex-shrink-0 truncate">
                        <Link to={`/product/${product.id}`} className="font-bold">
                          <span className="ml-2 flex-1">
                            {product.name}
                          </span>
                        </Link>
                      </div>
                      <div className="flex justify-center">
                        <span className="ml-2 flex-1">Chi tiết: {product.size} - {colorConverter(product.color)}, Số lượng: {product.quantity}</span>
                      </div>
                      <div className="flex justify-center">
                        <span className="ml-2">{currencyFomatter(product.price)}</span>
                      </div>
                      <Star rate={product.rate} canRating={true}
                        product={product.id} handleRating={handleRating} />
                    </li>
                  )
                })}
              </ul>
            </dd>
          </div>
        </dl>
      </div>

      <div className="border-t border-gray-200 flex justify-end py-3 pr-6">
        <button
          onClick={onRating}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
        >
          Lưu đánh giá
        </button>
      </div>
    </div>
  )
}