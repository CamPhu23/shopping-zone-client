import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import _ from 'lodash'
import { Cart } from "../../components/cart/cart"
import { ADMIN_PERMISSION, CLIENT_PERMISSION } from '../../constants/authentication'
import { Link, useLocation } from "react-router-dom";
import { CLIENT_AVT, LOGO } from '../../constants/avatar-url'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Header = ({ handleLogout, user }) => {
  const { pathname } = useLocation();

  const isCartCickable = !(pathname.includes('/payment') || pathname.includes('/sign-in')
    || pathname.includes('/sign-up') || pathname.includes('/forgot-password') || pathname.includes('/reset-password'));
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="z-50 fixed inset-0 flex lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 py-3 flex justify-end">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              <div className="flow-root" onClick={() => setOpen(false)}>
                  <Link
                    to={"/"}
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Trang chủ
                  </Link>
                </div>
                <div className="flow-root" onClick={() => setOpen(false)}>
                  <Link
                    to={"/product"}
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Sản phẩm
                  </Link>
                </div>
                <div className="flow-root" onClick={() => setOpen(false)}>
                  <Link
                    to={"/about"}
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Thương hiệu
                  </Link>
                </div>

                <div className="flow-root" onClick={() => setOpen(false)}>
                  <Link
                    to={"/contact"}
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Liên hệ
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">


                {(_.isEmpty(user) || user.permission === ADMIN_PERMISSION) ?

                  (<>
                    <div className="flow-root" onClick={() => setOpen(false)}>
                      <Link
                        to={"/sign-in"}
                        className="-m-2 p-2 block font-medium text-gray-900"
                      >
                        Đăng nhập
                      </Link>
                    </div>
                    <div className="flow-root" onClick={() => setOpen(false)}>
                      <Link
                        to={"/sign-up"}
                        className="-m-2 p-2 block font-medium text-gray-900"
                      >
                        Tạo tài khoản
                      </Link>
                    </div>
                  </>
                  ) : (
                    <>
                      <div className="flow-root" onClick={() => setOpen(false)}>
                        <Link
                          to={"/user-info"}
                          className="-m-2 p-2 block font-medium text-gray-900"
                        >
                          Tài khoản
                        </Link>
                      </div>
                      <div className="flow-root" onClick={() => setOpen(false)}>
                        <button
                          onClick={handleLogout}
                          className="-m-2 p-2 block font-medium text-gray-900"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    </>
                  )}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-200"
        >
          <div className="">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="hidden lg:block ml-4 flex lg:ml-0">
                <Link to={"/"}>
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-10 w-10 w-auto rounded-full"
                    src={LOGO}
                    alt=""
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  <Link
                    to={"/product"}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Sản phẩm
                  </Link>

                  <Link
                    to={"/about"}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Thương hiệu
                  </Link>

                  <Link
                    to={"/contact"}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Liên hệ
                  </Link>
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {(_.isEmpty(user) || user.permission === ADMIN_PERMISSION) ? (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to={"/sign-in"}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Đăng nhập
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link
                      to={"/sign-up"}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Tạo tài khoản
                    </Link>
                  </div>
                ) : (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to={"/user-info"}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src={CLIENT_AVT}
                        alt=""
                      />
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <button
                      onClick={handleLogout}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}

                {/* Cart */}
                {isCartCickable && (<Cart />)}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
