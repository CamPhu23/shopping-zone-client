import React, { useEffect, useState, Fragment } from "react";
import CheckboxConfirm from "../../../components/common/checkbox-confirm";
import ImageSlider from "../../../components/common/image-slider";
import { currencyFomatter } from "../../../converter/currency-fomatter";
import { dateFomatter } from "../../../converter/date-formatter";
import { Table } from "../../../components/common/table";
import { RECEIPT_CONSTANT } from "../../../constants/receipt";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { numberToStringConverter } from "../../../converter/data-type";

export const DetailReceipt = ({ item, onEditClick }) => {
  // convert products quantity to string
  // because table display number as currency
  item.products &&
    item.products.map(element => {
      return element.quantity = numberToStringConverter(element.quantity);
    });

  // update status logic
  const status = RECEIPT_CONSTANT.STATUS;
  const [selectedStatus, setSelectedStatus] = useState(item.status ? item.status : status[0])
  const renderStatusSelection = () => {
    return (
      <div className="">
        <Listbox value={selectedStatus} onChange={setSelectedStatus}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selectedStatus}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="-top-2 transform -translate-y-full absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {status.map((category, categoryIdx) => (
                  <Listbox.Option
                    key={categoryIdx}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'text-teal-900' : 'text-gray-900'
                      }`
                    }
                    value={category}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {category}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    )
  }

  const HandleEditing = () => {
    onEditClick({id: item._id, status: selectedStatus});
  }

  return (
    item && (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Chi tiết hoá đơn
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Các thông tin chi tiết về hóa đơn
          </p>
        </div>

        <div className="border-y pb-5 border-gray-200 max-h-96 overflow-y-scroll">
          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Mã hóa đơn</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item._id}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Tài khoản</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.client ? (item.client.username ? item.client.username : "Tài khoản Google") : "Tài khoản đã bị xóa"}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                Tên người nhận hàng
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.fullname}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Số điện thoại</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.phone}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                Địa chỉ nhận hàng
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.address}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.email}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Ngày tạo hóa đơn</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.createdAt ? dateFomatter(item.createdAt) : "Không có dữ liệu"}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                Ngày cập nhật trạng thái
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.updatedAt ? dateFomatter(item.updatedAt) : "Không có dữ liệu"}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Trạng thái đơn hàng</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.status ? item.status : "Đang xử lý"}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                Phương thức thanh toán
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.paymentMethod === "COD" ? item.paymentMethod : "Thẻ tín dụng"}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Tổng tiền hàng</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {currencyFomatter(item.totalPay)}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Tổng khuyến mãi</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {currencyFomatter(item.totalDiscount)}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Tiền giao hàng</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {currencyFomatter(item.shippingCost)}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Tổng tiền hóa đơn</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {currencyFomatter(item.totalBill)}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Sản phẩm</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 pt-2">
                <Table
                  columns={[
                    "Mã sản phẩm",
                    "Tên sản phẩm",
                    "Tổng tiền",
                    "Khuyến mãi (%)",
                    "Màu sắc",
                    "Size",
                    "Số lượng"
                  ]}
                  data={item.products}
                  theme="light"
                />
              </dd>
            </div>
          </div>

          <div className="w-1/4 px-4 sm:px-6 flex flex-row pb-5">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Cập nhật trạng thái</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 pt-2">
                {renderStatusSelection()}
              </dd>
            </div>
          </div>
        </div>

        <div className="flex justify-end px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => HandleEditing()}
            className="text-white focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 my-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Cập nhật
          </button>
        </div>
      </div>
    )
  );
};
