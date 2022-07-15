import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import _ from "lodash";
import { RegisterForm } from "../../../components/form/register-form";
import { registerRequest } from "../../../services/actions/auth-action";
import { CLIENT_PERMISSION } from "../../../constants/authentication";

export default function RegisterPage() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onSubmitForm = (formData) => {
    dispatch(registerRequest(formData));
  };

  return (!_.isEmpty(user) && user.permission === CLIENT_PERMISSION) ? (
    <Navigate to="/" replace />
  ) : (
    <>
      <div className="min-h-full grid grid-cols-3">
        <div className="hidden md:col-span-2 md:flex bg-signin-signup bg-no-repeat h-full w-full bg-cover"></div>

        <RegisterForm
          handleSubmitForm={(data) => onSubmitForm(data)}
        />
      </div>
    </>
  );
}
