import { Navigate, useNavigate } from "react-router-dom";
import _ from "lodash";
import { LoginForm } from "../../../components/form/login-form";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../../services/actions/auth-action";
import { CLIENT_PERMISSION } from "../../../constants/authentication";
import { useEffect } from "react";

export default function LoginPage() {
  const user = useSelector((state) => state.auth.user);
  const navigator = useNavigate();

  useEffect(() => {
    if(!_.isEmpty(user) && user.permission === CLIENT_PERMISSION) {
      navigator(-1);
    }
  }, [user])

  const dispatch = useDispatch();
  const onSubmitLoginForm = (data) => {
    dispatch(loginRequest(data));
  };
  
  return (
    <>
      <div className="min-h-full grid grid-cols-3">
        <div className="hidden md:col-span-2 md:flex bg-signin-signup bg-no-repeat h-full w-full bg-cover"></div>

        <LoginForm handleSubmitForm={(data) => onSubmitLoginForm(data)} />
      </div>
    </>
  );
}
