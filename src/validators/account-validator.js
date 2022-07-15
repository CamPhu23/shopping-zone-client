export const AccountValidator = {
  username: {
    required: {
      value: true,
      message: "Tên tài khoản không được bỏ trống"
    },
  },
  email: {
    required: {
      value: true,
      message: "Email không được bỏ trống"
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Email không hợp lệ"
    }
  },
  password: {
    required: {
      value: true,
      message: "Mật khẩu không được bỏ trống"
    },
    minLength: {
      value: 8,
      message: "Mật khẩu cần ít nhất 8 ký tự"
    }
  },
}

export const AccountValidatorError = (error) => {
  return error && (<span className='flex justify-start mx-1 text-red-500' role="alert">{error.message}</span>)
}