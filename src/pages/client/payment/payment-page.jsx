import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ProductsCart } from '../../../components/product/product-list-cart';
import { currencyFomatter } from '../../../converter/currency-fomatter.js'
import { totalPay, totalDiscount, totalBill, shippingCost } from '../../../converter/calculate-payment'
import { useForm } from "react-hook-form";
import { paymentService } from '../../../services/modules'
import { clearCartRequest } from '../../../services/actions/product-action';
import Toast from "../../../components/toast/toast";
import { ICON } from '../../../assets/svg-icon';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import _ from 'lodash';

export default function PaymentPage() {
  const [toastShow, setToastShow] = useState(false);
  const [toastMessages, setToastMessages] = useState("");
  const [toastIcon, setToastIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const products = useSelector(state => state.product.products);
  const [isCODPayment, setCODPayment] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const navigator = useNavigate();

  useEffect(() => {
    if (_.isEmpty(products)) {
      navigator("/product");
    }
  }, [products])

  const handlePayment = (data) => {
    setLoading(true);
    setDisable(true);

    const newProducts = products.map(({ image, ...product }) => product)
    data["paymentMethod"] = isCODPayment ? "COD" : "Card";

    // if method === COD => not submit card info to server
    if (data.paymentMethod === "COD") {
      delete data.cardNumber;
      delete data.cardEnddate;
      delete data.cardCVV;
    }

    let paymentData = {
      ...data,
      products: newProducts,
      totalPay: totalPay(products),
      shippingCost: shippingCost,
      totalDiscount: totalDiscount(products),
      totalBill: totalBill(products),
    };

    paymentService.postPayment(paymentData)
      .then(result => {
        setToastShow(true);
        setToastMessages("Thanh toán thành công");
        setToastIcon(ICON.Success);
        setLoading(false);
        
        setTimeout(() => {
          setDisable(false);
          dispatch(clearCartRequest());
        }, 5000)
      })
      .catch(e => {
        let error = JSON.parse(e);
        
        setLoading(false);
        setLoading(false);
        
        setToastShow(true);
        setToastMessages(error?.data.messages);
        setToastIcon(ICON.Fail);
      });
  };

  const renderTotalPayment = () => {
    return (
      <div className='space-y-3 divide-y divide-gray-200'>
        <div className='space-y-3'>
          <div className="flex justify-between text-gray-700">
            <p>Tổng tiền hàng:</p>
            <p>{currencyFomatter(totalPay(products))}</p>
          </div>
          <div className="flex justify-between text-gray-700">
            <p>Tổng tiền đã giảm:</p>
            <p>{currencyFomatter(totalDiscount(products))}</p>
          </div>
          <div className="flex justify-between text-gray-700">
            <p>Chi phí vận chuyển:</p>
            <p>{currencyFomatter(shippingCost)}</p>
          </div>
        </div>

        <div className="flex justify-between font-medium text-gray-900 pt-3">
          <p>Tổng tiền hàng:</p>
          <p>{currencyFomatter(totalBill(products))}</p>
        </div>
      </div>
    )
  }

  const renderCartProduct = () => {
    return (
      <div>
        <div className="border-gray-200 border-2 shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {(products && products.length !== 0) && <ProductsCart products={products} />}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-5 border-gray-200 border-2 shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white">
            <div className="flow-root">
              {(products && products.length !== 0) && renderTotalPayment()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const validateInput = {
    fullname: {
      required: {
        value: true,
        message: "Họ và tên không được bỏ trống"
      }
    },
    phone: {
      required: {
        value: true,
        message: "Số điện thoại không được bỏ trống"
      },
      minLength: {
        value: 10,
        message: "Số điện thoại phải bao gồm 10 số"
      },
      validate: (value) => { return value > 0 ? true : "Số diện thoại phải có dịnh dạng là số" }
    },
    email: {
      required: {
        value: true,
        message: "Email không được bỏ trống"
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Email không hợp lệ"
      }
    },
    address: {
      required: {
        value: true,
        message: "Địa chỉ không được bỏ trống"
      },
    },
    cardNumber: {
      required: {
        value: !isCODPayment,
        message: "Số thẻ không được bỏ trống"
      },
      validate: (value) => {
        if (!isCODPayment) {
          if (value.length < 12) {
            return "Số thẻ không được ít hơn 12 số";
          }
          if (!(value > 0)) {
            return "Số thẻ phải có dịnh dạng là số";
          }
        }
        return true
      }
    },
    cardCVV: {
      required: {
        value: !isCODPayment,
        message: "Số thẻ không được bỏ trống"
      },
      validate: (value) => {
        if (!isCODPayment) {
          if (value.length < 4) {
            return "Số thẻ không được ít hơn 4 số";
          }
          if (!(value > 0)) {
            return "Số thẻ phải có dịnh dạng là số";
          }
        }
        return true
      }
    },
    cardEnddate: {
      required: {
        value: !isCODPayment,
        message: "Số thẻ không được bỏ trống"
      },
      validate: (value) => {
        if (!isCODPayment) {
          if (new Date(value) <= new Date()) {
            return "Thẻ đã hết thời hạn";
          }
        }
        return true
      }
    }
  }

  const renderError = (error) => {
    return error && (<span className='text-red-500' role="alert">{error.message}</span>)
  }

  const renderPaymentForm = () => {
    return (
      <div>
        <form onSubmit={handleSubmit(handlePayment)} className="border-gray-200 border-2 shadow overflow-hidden sm:rounded-md">

          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-9 sm:col-span-4">
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autoComplete="given-name"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  {...register("fullname", validateInput.fullname)}
                />

                {renderError(errors.fullname)}
              </div>

              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  maxLength={10}
                  autoComplete="phone"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  {...register("phone", validateInput.phone)}
                />

                {renderError(errors.phone)}
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  {...register("email", validateInput.email)}
                />

                {renderError(errors.email)}
              </div>

              <div className="col-span-6">
                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  {...register("address", validateInput.address)}
                />


                {renderError(errors.address)}
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Phương thức thanh toán
                </label>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="cod"
                      name="payment"
                      type="radio"
                      defaultChecked
                      onChange={() => setCODPayment(true)}
                      className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300"
                    />
                    <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                      COD (Chi phí sẽ được thanh toán sau khi nhận hàng)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="card"
                      name="payment"
                      type="radio"
                      onChange={() => setCODPayment(false)}
                      className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300"
                    />
                    <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                      Thẻ tín dụng
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                  Mã số thẻ tín dụng
                </label>
                <input
                  type="text"
                  name="card-number"
                  id="card-number"
                  autoComplete="card-number"
                  disabled={isCODPayment}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  maxLength={12}
                  {...register("cardNumber", validateInput.cardNumber)}
                />

                {renderError(errors.cardNumber)}
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="card-enddate" className="block text-sm font-medium text-gray-700">
                  Ngày hết hạn
                </label>
                <input
                  type="date"
                  name="card-enddate"
                  id="card-enddate"
                  autoComplete="card-enddate"
                  disabled={isCODPayment}
                  min='2000-01-01' max='3000-12-31'
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  {...register("cardEnddate", validateInput.cardEnddate)}
                />

                {renderError(errors.cardEnddate)}
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="card-cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  name="card-cvv"
                  id="card-cvv"
                  autoComplete="card-cvv"
                  disabled={isCODPayment}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  maxLength={4}
                  {...register("cardCVV", validateInput.cardCVV)}
                />

                {renderError(errors.cardCVV)}
              </div>

              <div className="col-span-6">
                <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                  Ghi chú
                </label>
                <textarea
                  placeholder="Ví dụ: Giao hàng vào giờ hành chính"
                  name="note"
                  id="note"
                  rows={3}
                  autoComplete="note"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              disabled={disable}
              type="submit"
              className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {loading && (
                <div className="flex items-center justify-center">
                  <svg
                    role="status"
                    className="w-4 h-4 mr-2 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              )}
              Thanh toán
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="m-10">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">

          {/* Product list */}
          {renderCartProduct()}

        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">

          {/* Payment info */}
          {renderPaymentForm()}
        </div>
      </div>

      <Toast
        show={toastShow}
        messages={toastMessages}
        icon={toastIcon}
        mode={"light"}
        onClose={() => setToastShow(false)}
        autoClose={5000}
      />
    </div>
  )
}
