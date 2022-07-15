/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react'
import { XIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';
import { ProductsCart } from '../product/product-list-cart';
import { totalPay } from '../../converter/calculate-payment';
import { currencyFomatter } from '../../converter/currency-fomatter';
import _ from 'lodash';
import { CLIENT_PERMISSION } from '../../constants/authentication';

export const Cart = () => {
  const products = useSelector(state => state.product.products);
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.auth.user);

  const renderPaymentPart = () => {
    return (
      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
        {(products && products.length != 0) ?
          (
            <>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Tổng tiền</p>
                <p>{currencyFomatter(totalPay(products))}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Chưa bao gồm chi phí vận chuyển.</p>
              <div className="mt-6">

                {(!_.isEmpty(user) && user.permission === CLIENT_PERMISSION)
                  ?
                  renderPaymentButton()
                  :
                  renderSignInButton()
                }
              </div>
            </>
          ) : (<></>)
        }
        <div className="mt-3 flex justify-center text-center text-sm text-gray-500">
          <p>
            {(products && products.length != 0) && "hoặc "}

            <Link to='/product' >
              <button
                type="button"
                className="font-medium text-teal-600 hover:text-teal-500"
                onClick={() => setOpen(false)}
              >
                Tiếp tục mua sắm<span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    )
  }

  const renderPaymentButton = () => {
    return (
      <Link
        to='/payment'
        className="flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700"
      >
        Thanh toán
      </Link>
    )
  }

  const renderSignInButton = () => {
    return (
      <Link
        to='/sign-in'
        className="flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700"
      >
        <button
          className="w-full"
          type="button"
          onClick={() => setOpen(false)}
        >
          Đăng nhập
        </button>
      </Link>
    )
  }

  const renderCartIcon = () => {
    return (
      <div className="ml-4 flow-root lg:ml-6">
        <button className="group -m-2 p-2 flex items-center">
          <ShoppingCartIcon
            className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
            onClick={() => setOpen(true)}
          />
          <span className="sr-only">items in cart, view bag</span>
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{products.length}</span>
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Cart icon */}
      {renderCartIcon()}

      {/* Cart side bar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto no-scrollbar py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900"> Giỏ hàng </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {products && products.length != 0
                                ?
                                <ProductsCart products={products} />
                                :
                                <div className='text-sm text-gray-400 my-8 flex justify-center'>Chưa có sản phẩm được thêm vào giỏ hàng</div>
                              }
                            </ul>
                          </div>
                        </div>
                      </div>

                      {renderPaymentPart()}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>

  )
}
