import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthError } from '../../services/actions/auth-action';
import { Link } from 'react-router-dom';
import { authService } from "../../services/modules";
import { useParams } from 'react-router-dom';
import { loginRequest } from "../../services/actions/auth-action";

export const ResetPasswordForm = () => {
  const { register, handleSubmit, formState: { errors }, setFocus, reset, setError, watch } = useForm();

  const dispatch = useDispatch();
  const authError = useSelector(state => state.auth.error);
  const [serverError, setServerError] = useState("");
  const [successMess, setSuccessMess] = useState("");
  const { token } = useParams();

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

  const handleForgotPassword = (formInput) => {
    authService
      .handleResetPassword({ token, newPassword: formInput.password })
      .then((data) => {
        data.password = formInput.password;
        dispatch(loginRequest(data));
      })
      .catch(e => {
        setSuccessMess("");

        let error = JSON.parse(e);
        const message =
          (error.status == 410 && error.data.messages == "jwt expired")
            ? "Đường link bạn sử dụng đã hết hạn"
            : "Lỗi vui lòng thử lại";

        setError("serverMess", { message });
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
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Hãy thay đổi mật khẩu mới</h2>
        </div>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit(handleForgotPassword)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md -space-y-px">
            <div className='pt-3'>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mật khẩu
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Mật khẩu"
                  onChangeCapture={handleOnChange}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Mật khẩu không được bỏ trống"
                    },
                    minLength: {
                      value: 8,
                      message: "Mật khẩu cần ít nhất 8 ký tự"
                    }
                  })
                  }
                />

                {errors.password && (errors.password.type === "required" || "minLength") && (
                  <span className='text-red-500' role="alert">{errors.password.message}</span>
                )}
              </div>

              <div className='pt-3'>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Mật khẩu xác nhận
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Mật khẩu xác nhận"
                  onChangeCapture={handleOnChange}
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Mật khẩu xác nhận không được bỏ trống"
                    },
                    minLength: {
                      value: 8,
                      message: "Mật khẩu xác nhận cần ít nhất 8 ký tự"
                    },
                    validate: (value) => {
                      if (watch('password') !== value) {
                        return "Mật khẩu và mật khẩu xác nhận phải trùng nhau";
                      }
                    }
                  })
                  }
                />

                {errors.confirmPassword && (errors.confirmPassword.type === "required" || "minLength") && (
                  <span className='text-red-500' role="alert">{errors.confirmPassword.message}</span>
                )}

                {errors.serverMess && (
                  <span className='text-red-500' role="alert">{errors.serverMess.message}</span>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Xác nhận thay đổi mật khẩu
          </button>

          <div className="text-sm mt-2 flex items-center justify-center">
            <Link to={'/forgot-password'} className="font-medium text-teal-600 hover:text-teal-500">
              Quay trở về trang Quên mật khẩu
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}