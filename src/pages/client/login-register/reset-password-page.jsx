import _ from "lodash";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ResetPasswordForm } from "../../../components/form/reset-password-form";
import { CLIENT_PERMISSION } from "../../../constants/authentication";

export default function ForgotPasswordPage() {
  const user = useSelector((state) => state.auth.user);

  return (!_.isEmpty(user) && user.permission === CLIENT_PERMISSION) ? (
    <Navigate to="/" replace />
  ) : (
    <>
      <div className="min-h-full grid grid-cols-3">
        <div className="hidden md:col-span-2 md:flex bg-signin-signup bg-no-repeat h-full w-full bg-cover"></div>

        <ResetPasswordForm />
      </div>
    </>
  );
}