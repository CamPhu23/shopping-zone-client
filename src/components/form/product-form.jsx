import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { CREATE_FORM_TYPE, EDIT_FORM_TYPE } from "../../constants/variables";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { PRODUCT_CONSTANT } from "../../constants/product";
import { ProductValidator, ProductValidatorError } from "../../validators/product-validator";
import { Modal } from "../common/modal";
import PreviewImageInput from "./preview-image-input";
import UploadImageInput from "./upload-image-input";

const ProductForm = ({ type, handleSubmitForm, item = null }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const categories = PRODUCT_CONSTANT.CATEGORIES;
  const tags = PRODUCT_CONSTANT.TAGS;
  const [images, setImages] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState(item ? item.tags : []);
  const [selectedCategory, setSelectedCategory] = useState(item ? item.category : categories[0])

  // Image input logic
  const onInputImageChange = (e) => {
    const files = e.target.files;

    if (files.length > 4) {
      setIsOpenModal(true);
      return;
    }

    setError("images", {
      type: "required",
      message: "",
    });

    //check if total images is greater than 4 or not
    if (type === EDIT_FORM_TYPE) {
      const newImages = [...item.images, ...Array.from(files)];

      if (newImages.length > 4) {
        setIsOpenModal(true);
        return;
      }
    }

    setImages([...Array.from(files)]);
  };

  const onChoosenImageDelete = (image) => {
    const index = images.indexOf(image);
    if (index > -1) {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    }

    if (type === EDIT_FORM_TYPE) {
      const index = item.images.indexOf(image);
      if (index < 0) return;

      setDeletedImages([...deletedImages, item.images[index]]);
      item.images.splice(index, 1);
    }
  };

  const onModalClose = () => {
    setIsOpenModal(false);
  };

  // Tags select options input (UI and multiple select logic)
  const isSelected = (value) => {
    return selectedTags.find((el) => el === value) ? true : false;
  }

  const handleSelect = (value) => {
    if (!isSelected(value)) {
      const selectedTagsUpdated = [
        ...selectedTags,
        tags.find((el) => el === value)
      ];
      setSelectedTags(selectedTagsUpdated);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  };

  const handleDeselect = (value) => {
    const selectedTagsUpdated = selectedTags.filter((el) => el !== value);
    setSelectedTags(selectedTagsUpdated);
    setIsOpen(true);
  };

  const renderTagsSelection = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="w-full max-w-xs mx-auto">
          <Listbox
            as="div"
            className="space-y-1"
            value={selectedTags}
            onChange={(value) => handleSelect(value)}
            open={isOpen}
          >
            {() => (
              <>
                <div className="relative">
                  <span className="inline-block w-full rounded-md shadow-sm">
                    <Listbox.Button
                      className="cursor-pointer relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      onClick={() => setIsOpen(!isOpen)}
                      open={isOpen}
                    >
                      <span className="block truncate">
                        {selectedTags.length < 1
                          ? "Chọn đặc trưng"
                          : `Đặc trưng đã chọn (${selectedTags.length})`}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Listbox.Button>
                  </span>

                  <Transition
                    unmount={false}
                    show={isOpen}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                  >
                    <Listbox.Options
                      static
                      className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                    >
                      {tags.map((tag) => {
                        const selected = isSelected(tag);
                        return (
                          <Listbox.Option key={tag} value={tag}>
                            {({ active }) => (
                              <div
                                className={`${active
                                  ? "text-teal-900"
                                  : "text-gray-900"
                                  } cursor-pointer select-none relative py-2 pl-10 pr-4`}
                              >
                                <span
                                  className={`${selected ? 'font-medium' : 'font-normal'
                                    } block truncate`}
                                >
                                  {tag}
                                </span>
                                {selected && (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                )}
                              </div>
                            )}
                          </Listbox.Option>
                        );
                      })}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
      </div>
    )
  }

  // Catogories select options input
  const renderCategorieSelection = () => {
    return (
      <div className="">
        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selectedCategory}</span>
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
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {categories.map((category, categoryIdx) => (
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

  // Submit form
  const onSubmitForm = async (data) => {
    console.log(data);
    if (images.length == 0) {
      if (
        type === CREATE_FORM_TYPE ||
        (type === EDIT_FORM_TYPE && item && item.images.length < 1)
      ) {
        setError("images", {
          type: "required",
          message: "Phải chọn tối thiểu 1 ảnh",
        });
        return;
      }
    }

    if (type === EDIT_FORM_TYPE) {
      data.id = item.id;
      data.deletedImages = deletedImages;
    }
    handleSubmitForm(data, images, selectedCategory, selectedTags);
  };

  return isOpenModal ? (
    <Modal isOpen={isOpenModal} onClose={onModalClose} />
  ) : (
    <form className="mx-4 mt-6" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="relative z-0 w-full mb-6 group">
        <input
          id="name"
          type="text"
          name="product_name"
          placeholder=" "
          defaultValue={item ? item.name : ""}
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          {...register("name", ProductValidator.name)}
        />
        <label
          htmlFor="product_name"
          className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Tên sản phẩm
        </label>
        {ProductValidatorError(errors.name)}
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="description"
          placeholder=" "
          defaultValue={item ? item.description : ""}
          className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          {...register("description", ProductValidator.description)}
        />
        <label
          htmlFor="description"
          className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Mô tả
        </label>
        {ProductValidatorError(errors.description)}
      </div>

      <div className="flex flex-row mb-4">
        <div className="w-full sm:w-1/2 pr-5">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="price"
              placeholder=" "
              onWheel={(e) => e.target.blur()}
              defaultValue={item ? item.price : ""}
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              {...register("price", ProductValidator.price)}
            />
            <label
              htmlFor="price"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Giá tiền
            </label>
            {ProductValidatorError(errors.price)}
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="discount"
              placeholder=" "
              onWheel={(e) => e.target.blur()}
              defaultValue={item ? item.discount : "0"}
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              {...register("discount", ProductValidator.discount)}
            />
            <label
              htmlFor="discount"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Khuyến mãi
            </label>
            {ProductValidatorError(errors.discount)}
          </div>
        </div>

      </div>

      <div className="flex flex-row mb-4">
        {categories && categories.length > 0 && (
          <div className="flex flex-row sm:w-1/2 mb-6 group items-center space-x-5">
            <label
              htmlFor="category"
              className="text-sm text-gray-400 flex items-center"
            >
              Thể loại sản phẩm:
            </label>

            {renderCategorieSelection()}
          </div>
        )}

        <div className="flex flex-row w-full sm:w-1/2 mb-6 group items-center space-x-5">
          <label
            htmlFor="tags"
            className="text-sm text-gray-400 flex items-center"
          >
            Đặc trưng sản phẩm:
          </label>
          {renderTagsSelection()}
        </div>
      </div>

      <UploadImageInput
        {...register("images")}
        errors={errors.images}
        onInputChange={onInputImageChange}
      />

      <div className="flex">
        <PreviewImageInput
          images={
            type === EDIT_FORM_TYPE ? [...images, ...item.images] : images
          }
          onImageDelete={onChoosenImageDelete}
        />

        <div className="flex items-start">
          <button
            type="submit"
            className="mr-4 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            {type === EDIT_FORM_TYPE ? "Cập nhật" : "Tạo mới"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
