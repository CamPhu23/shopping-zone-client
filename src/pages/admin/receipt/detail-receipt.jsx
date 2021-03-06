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
            Chi ti???t ho?? ????n
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            C??c th??ng tin chi ti???t v??? h??a ????n
          </p>
        </div>

        <div className="border-y pb-5 border-gray-200 max-h-96 overflow-y-scroll">
          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">M?? h??a ????n</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item._id}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">T??i kho???n</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.client ? (item.client.username ? item.client.username : "T??i kho???n Google") : "T??i kho???n ???? b??? x??a"}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                T??n ng?????i nh???n h??ng
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.fullname}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">S??? ??i???n tho???i</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.phone}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                ?????a ch??? nh???n h??ng
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
              <dt className="text-sm font-medium text-gray-500">Ng??y t???o h??a ????n</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.createdAt ? dateFomatter(item.createdAt) : "Kh??ng c?? d??? li???u"}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                Ng??y c???p nh???t tr???ng th??i
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.updatedAt ? dateFomatter(item.updatedAt) : "Kh??ng c?? d??? li???u"}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Tr???ng th??i ????n h??ng</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.status ? item.status : "??ang x??? l??"}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                Ph????ng th???c thanh to??n
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.paymentMethod === "COD" ? item.paymentMethod : "Th??? t??n d???ng"}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">T???ng ti???n h??ng</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {currencyFomatter(item.totalPay)}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">T???ng khuy???n m??i</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {currencyFomatter(item.totalDiscount)}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Ti???n giao h??ng</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {currencyFomatter(item.shippingCost)}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">T???ng ti???n h??a ????n</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {currencyFomatter(item.totalBill)}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">S???n ph???m</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 pt-2">
                <Table
                  columns={[
                    "M?? s???n ph???m",
                    "T??n s???n ph???m",
                    "T???ng ti???n",
                    "Khuy???n m??i (%)",
                    "M??u s???c",
                    "Size",
                    "S??? l?????ng"
                  ]}
                  data={item.products}
                  theme="light"
                />
              </dd>
            </div>
          </div>

          <div className="w-1/4 px-4 sm:px-6 flex flex-row pb-5">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">C???p nh???t tr???ng th??i</dt>
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
            C???p nh???t
          </button>
        </div>
      </div>
    )
  );
};
