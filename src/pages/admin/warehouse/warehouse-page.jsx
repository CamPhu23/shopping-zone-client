import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICON } from "../../../assets/svg-icon";
import TopSection from "../../../components/common/main-top-section";
import Toast from "../../../components/toast/toast";
import { PRODUCT_CONSTANT } from "../../../constants/product";
import { adminProductService, adminWarehouseSevice } from "../../../services/modules";
import { WarehouseValidator, WarehouseValidatorError } from "../../../validators/warehouse-validator";

const WarehousePage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset
  } = useForm();

  const [toastShow, setToastShow] = useState(false);
  const [toastMessages, setToastMessages] = useState("");
  const [toastIcon, setToastIcon] = useState(null);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();

  const [colors, setColors] = useState(PRODUCT_CONSTANT.COLOR);
  const [selectedColor, setSelectedColor] = useState(PRODUCT_CONSTANT.COLOR[0]);

  const [sizes, setSizes] = useState(PRODUCT_CONSTANT.SIZE);
  const [selectedSize, setSelectedSize] = useState(PRODUCT_CONSTANT.SIZE[0]);

  const handleImport = (data) => {
    console.log(data);
    let formData = {
      name: selectedProduct,
      color: selectedColor,
      size: selectedSize,
      quantity: data.quantity
    }

    adminWarehouseSevice
      .postImportProduct(formData)
      .then(() => {
        setToastShow(true);
        setToastMessages("Nhập hàng thành công");
        setToastIcon(ICON.Success);

        reset();
      })
      .catch((error) => {
        console.log(error);
        setToastShow(true);
        setToastMessages("Nhập hàng thất bại");
        setToastIcon(ICON.Fail);
      });
  }

  useEffect(() => {
    adminProductService
      .getAllProducts("1", "All")
      .then(response => {
        setProducts(response.products)

        if (response.products.length !== 0) {
          setSelectedProduct(response.products[0].name);
        }
      })
  }, [])

  const renderProductSelection = () => {
    return (
      <div className="">
        <Listbox value={selectedProduct} onChange={setSelectedProduct}>
          <div className="relative mt-1">
            <Listbox.Button className="z-0 relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selectedProduct}</span>
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
              <Listbox.Options
                className="z-30 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {products.map((product, productIdx) => (
                  <Listbox.Option
                    key={productIdx}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'text-teal-900' : 'text-gray-900'
                      }`
                    }
                    value={product.name}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {product.name}
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

  const renderColorSelection = () => {
    return (
      <div className="">
        <Listbox value={selectedColor} onChange={setSelectedColor}>
          <div className="relative mt-1">
            <Listbox.Button className="z-0 relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selectedColor}</span>
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
              <Listbox.Options
                className="z-30 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {colors.map((color, colorIdx) => (
                  <Listbox.Option
                    key={colorIdx}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'text-teal-900' : 'text-gray-900'
                      }`
                    }
                    value={color}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {color}
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

  const renderSizeSelection = () => {
    return (
      <div>
        <Listbox value={selectedSize} onChange={setSelectedSize}>
          <div className="relative mt-1">
            <Listbox.Button className="z-0 relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selectedSize}</span>
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
              <Listbox.Options
                className="z-30 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {sizes.map((size, sizeIdx) => (
                  <Listbox.Option
                    key={sizeIdx}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'text-teal-900' : 'text-gray-900'
                      }`
                    }
                    value={size}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {size}
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

  const renderQuantityInput = () => {
    return (
      <>
        <input
          type="number"
          name="quantity"
          placeholder=" "
          // defaultValue={item ? item.price : ""}
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
          {...register("quantity", WarehouseValidator.quantity)}
        />
        <label
          htmlFor="quantity"
          className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Số lượng
        </label>
        {WarehouseValidatorError(errors.quantity)}
      </>
    )
  }

  return (
    <div>
      <div className="flex h-full">
        <div className="w-full flex flex-col relative">
          <TopSection
            titleText="Quản lý kho hàng"
          />
          <div className="flex justify-center">
            <form className="mx-4 mt-3 sm:w-3/4 lg:w-3/4" onSubmit={handleSubmit(handleImport)}>
              <div className="flex flex-row mb-4">
                <div className="w-full pr-5 sm:w-1/3">
                  <div className="relative w-full mb-6 group text-white">
                    Tên sản phẩm
                  </div>
                </div>
                <div className="w-full pr-5 sm:w-2/3">
                  <div className="relative w-full mb-6 group">
                    {renderProductSelection()}
                  </div>
                </div>
              </div>
              <div className="flex flex-row mb-4">
                <div className="w-full pr-5 sm:w-1/3">
                  <div className="relative w-full mb-6 group text-white">
                    Màu sản phẩm
                  </div>
                </div>
                <div className="w-full pr-5 sm:w-2/3">
                  <div className="relative w-full mb-6 group">
                    {renderColorSelection()}
                  </div>
                </div>
              </div>
              <div className="flex flex-row mb-4">
                <div className="w-full pr-5 sm:w-1/3">
                  <div className="relative w-full mb-6 group text-white">
                    Size sản phẩm
                  </div>
                </div>
                <div className="w-full pr-5 sm:w-2/3">
                  <div className="relative w-full mb-6 group">
                    {renderSizeSelection()}
                  </div>
                </div>
              </div>
              <div className="flex flex-row mb-4">
                <div className="w-full pr-5 sm:w-1/3">
                  <div className="relative w-full mb-6 group text-white">
                    Số lượng nhập
                  </div>
                </div>
                <div className="w-full sm:w-2/3 pr-5">
                  <div className="relative w-full mb-6 group">
                    {renderQuantityInput()}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mr-5">
                <button
                  type="submit"
                  className="focus:ring-0 text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-purple-600 hover:bg-purple-700 focus:ring-purple-900"
                >
                  Nhập hàng
                </button>
              </div>
            </form>
          </div>
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
  );
};

export default WarehousePage;