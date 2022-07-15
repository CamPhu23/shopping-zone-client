import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthError } from '../../services/actions/auth-action';
import { Link } from 'react-router-dom';
import { authService } from "../../services/modules";

export const ForgotPasswordForm = () => {
  const { register, handleSubmit, formState: { errors }, setFocus, reset, setError } = useForm();

  const dispatch = useDispatch();
  const authError = useSelector(state => state.auth.error);
  const [serverError, setServerError] = useState("");
  const [successMess, setSuccessMess] = useState("");

  useEffect(() => {
    if (!_.isEmpty(authError)) {
      dispatch(resetAuthError());
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(authError)) {
      const { message } = authError;
      setFocus('username');

      setServerError(message);
    }
  }, [authError]);

  const handleForgotPassword = (data) => {
    authService
      .handleForgotPassword(data)
      .then(() => {
        setSuccessMess("Yêu cầu thay đổi mật khẩu đã được gửi tới email");
        reset();
      })
      .catch(e => {      
        setSuccessMess("");
        
        let error = JSON.parse(e);
        const message = error.status == 404
          ? "Email không tồn tại trong hệ thống"
          : "Lỗi vui lòng thử lại";
  
        setError("email", {message});
      })
  };

  const handleOnChange = () => {
    if (!_.isEmpty(serverError)) {
      setServerError("");
    }
  }

  return (
    <div className="py-2 col-span-3 md:col-span-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md lg:w-4/5 space-y-2">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Bạn quên mật khẩu?</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            đừng lo hãy nhập email mà bạn tại đây
          </p>
        </div>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit(handleForgotPassword)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md -space-y-px">
            <div className='pt-1'>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                onChangeCapture={handleOnChange}
                onClick={() => setSuccessMess("")}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email không được bỏ trống"
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email không hợp lệ"
                  }
                })}
              />
              {errors.email && (
                <span className='text-red-500' role="alert">{errors.email.message}</span>
              )}
              {successMess && (
                <span className='text-green-600' role="success">{successMess}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Gửi xác nhận thay đổi mật khẩu
          </button>

          <div className="text-sm mt-2 flex items-center justify-center">
            <Link to={'/sign-up'} className="font-medium text-teal-600 hover:text-teal-500">
              Bạn chưa có tài khoản?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
