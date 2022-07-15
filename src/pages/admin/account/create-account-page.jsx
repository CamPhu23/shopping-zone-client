import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICON } from "../../../assets/svg-icon";
import AccountForm from "../../../components/form/account-form";
import Toast from "../../../components/toast/toast";
import { NAVIGATE_URL } from "../../../constants/navigate-url";
import { CREATE_FORM_TYPE } from "../../../constants/variables";
import { adminAccountService } from "../../../services/modules";
import LoadingPage from "../../loaders/loading-page";

const CreateAccountPage = () => {
  const [toastShow, setToastShow] = useState(false);
  const [toastMessages, setToastMessages] = useState("");
  const [toastIcon, setToastIcon] = useState(null);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const onSubmitForm = async (data) => {
    setIsLoading(true);

    adminAccountService
      .createClient(data)
      .then((data) => {
        setIsLoading(false);
        
        setToastShow(true);
        setToastMessages("Tạo tài khoản thành công");
        setToastIcon(ICON.Success);
        
        setTimeout(() => {
          navigate(NAVIGATE_URL.CLIENT_LIST);
        }, 5000)
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false);

        let error = JSON.parse(e);
        const message =
          (error.status == 400)
            ? "Tài khoản hoặc email đã được sử dụng"
            : "Tạo tài khoản thất bại";

        setToastShow(true);
        setToastMessages(message);
        setToastIcon(ICON.Fail);
      });
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <>
      <div className="p-6 pb-2 flex justify-center">
        <div className="text-xl text-slate-100 font-bold">
          Biểu mẫu tạo mới tài khoản
        </div>
      </div>

      <AccountForm
        type={CREATE_FORM_TYPE}
        handleSubmitForm={onSubmitForm}
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

export default CreateAccountPage;
