import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AccountForm from "../../../components/form/account-form";
import { EDIT_FORM_TYPE } from "../../../constants/variables";
import LoadingPage from "../../loaders/loading-page";
import { adminAccountService } from '../../../services/modules/'
import { NAVIGATE_URL } from "../../../constants/navigate-url";
import Toast from "../../../components/toast/toast";
import { ICON } from "../../../assets/svg-icon";

const EditAccountPage = () => {
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

  const onSubmitForm = async (formData) => {
    formData._id = data._id;
    adminAccountService
      .updateClient(formData)
      .then((result) => {
        setIsLoading(false);
        
        setToastShow(true);
        setToastMessages("Cập nhật thành công");
        setToastIcon(ICON.Success);
        
        setTimeout(() => {
          navigate(NAVIGATE_URL.CLIENT_LIST);
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
          Biểu mẫu cập nhật tài khoản
        </div>
      </div>

      <AccountForm
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

export default EditAccountPage;
