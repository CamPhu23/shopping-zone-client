import { PaperClipIcon } from '@heroicons/react/solid'
import { currencyFomatter } from '../../converter/currency-fomatter'
import { dateFomatter } from '../../converter/date-formatter'
import { Link } from 'react-router-dom'
import { colorConverter } from '../../converter/color-converter'

export const Receipt = ({ item }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg no-scrollbar">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Thông tin hóa đơn</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Mã hóa đơn: {item._id}</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Họ và tên người nhận:</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{item.fullname}</dd>
            <dt className="text-sm font-medium text-gray-500">Email:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{item.email}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Số điện thoại:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{item.phone}</dd>
            <dt className="text-sm font-medium text-gray-500">Địa chỉ giao hàng:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{item.address}</dd>
          </div>
          <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Ngày đặt hàng:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{dateFomatter(item.createdAt)}</dd>
            <dt className="text-sm font-medium text-gray-500">Ngày giao hàng:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{item.status === "Đã giao hàng" ? dateFomatter(item.updatedAt) : "Đang cập nhật..."}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Trạng thái đơn hàng:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{item.status}</dd>
            <dt className="text-sm font-medium text-gray-500">Phương thức:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{item.paymentMethod === "COD" ? item.paymentMethod : "Thẻ tín dụng"}</dd>
          </div>
          <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Tổng tiền hàng:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{currencyFomatter(item.totalPay)}</dd>
            <dt className="text-sm font-medium text-gray-500">Tổng tiền khuyến mãi:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{currencyFomatter(item.totalDiscount)}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Tổng tiền vận chuyển:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{currencyFomatter(item.shippingCost)}</dd>
            <dt className="text-sm font-medium text-gray-500">Tổng tiền hóa đơn:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">{currencyFomatter(item.totalBill)}</dd>
          </div>
          <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Ghi chú</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
              {item.note ? item.note : "Không có ghi chú"}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Sản phẩm</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4">
              <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {item.products && item.products.map((product) => {
                  return (
                    <li key={product.id} className="pl-3 pr-4 py-3 flex text-sm sm:grid sm:grid-cols-3">
                      <div className="ml-2 flex-shrink-0 truncate">
                        <Link to={`/product/${product.id}`} target="_blank" className="font-bold">
                          <span className="ml-2 flex-1">
                            {product.name}
                          </span>
                        </Link>
                    </div>
                      <div className="flex">
                        <span className="ml-2 flex-1">Chi tiết: {product.size} - {colorConverter(product.color)}, Số lượng: {product.quantity}</span>
                      </div>
                      <div className="flex justify-end">
                        <span className="ml-2">{currencyFomatter(product.price)}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}