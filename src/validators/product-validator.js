export const ProductValidator = {
  name: {
    required: {
      value: true,
      message: "Tên sản phẩm không được để trống",
    },
    minLength: {
      value: 5,
      message: "Tên sản phẩm phải có tối thiểu 5 ký tự",
    },
  },
  description: {
    required: {
      value: true,
      message: "Mô tả không được để trống",
    },
    minLength: {
      value: 50,
      message: "Mô tả phải có tối thiểu 50 ký tự",
    },
  },
  price: {
    required: {
      value: true,
      message: "Giá tiền không được để trống",
    },
    min: {
      value: 1,
      message: "Giá tiền không hợp lệ",
    },
    valueAsNumber: true,
  },
  discount: {
    min: {
      value: 0,
      message: "Khuyến mãi hợp lệ trong khoảng 0-99%",
    },
    max: {
      value: 99,
      message: "Khuyến mãi hợp lệ trong khoảng 1-99%",
    },
    valueAsNumber: true,
  },
}

export const ProductValidatorError = (error) => {
  return error && (
    <span
      className="peer-focus:font-medium text-sm text-red-500"
      role="alert"
    >
      {error.message}
    </span>
  )
}