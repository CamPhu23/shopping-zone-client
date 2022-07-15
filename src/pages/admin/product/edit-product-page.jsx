import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ICON } from "../../../assets/svg-icon";
import ProductForm from "../../../components/form/product-form";
import Toast from "../../../components/toast/toast";
import { CLOUDINARY_CONFIG } from "../../../config/cloudinary";
import { NAVIGATE_URL } from "../../../constants/navigate-url";
import { EDIT_FORM_TYPE } from "../../../constants/variables";
import { adminCloudinaryService, adminProductService } from "../../../services/modules";
import LoadingPage from "../../loaders/loading-page";

const EditProductPage = () => {
  const [toastShow, setToastShow] = useState(false);
  const [toastMessages, setToastMessages] = useState("");
  const [toastIcon, setToastIcon] = useState(null);

  const navigate = useNavigate();
  const { state } = useLocation();
  // @ts-ignore
  const { data } = state;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    }
  }, []);

  const onSubmitForm = async (data, images, selectedCategory, selectedTags) => {
    setIsLoading(true);

    let imagesInfo = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const config = CLOUDINARY_CONFIG(image);

      const resonse = await adminCloudinaryService.uploadImage(config);
      imagesInfo.push(resonse);
    }

    const formData = { ...data };
    formData.images = imagesInfo;
    formData.tags = selectedTags;
    formData.category = selectedCategory;

    adminProductService
      .updateProduct(formData)
      .then((data) => {
        setIsLoading(false);

        setToastShow(true);
        setToastMessages("Cập nhật thành công");
        setToastIcon(ICON.Success);
        
        setTimeout(() => {
          navigate(NAVIGATE_URL.PRODUCT_LIST);
        }, 5000)
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false);

        setToastShow(true);
        setToastMessages("Cập nhật thất bại");
        setToastIcon(ICON.Fail);
      });
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <>
      <div className="p-6 pb-2 flex justify-center">
        <div className="text-xl text-slate-100 font-bold text-">
          Biểu mẫu cập nhật sản phẩm
        </div>
      </div>

      <ProductForm
        type={EDIT_FORM_TYPE}
        handleSubmitForm={onSubmitForm}
        item={data}
      />

      <Toast
        show={toastShow}
        messages={toastMessages}
        icon={toastIcon}
        mode={"light"}
        onClose={() => setToastShow(false)}
        autoClose={5000}
      />
    </>
  );
};

export default EditProductPage;
