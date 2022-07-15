export const WarehouseValidator = {
  quantity: {
    min: {
      value: 1,
      message: "Số lượng nhập trong khoảng 1-10000",
    },
    max: {
      value: 10000,
      message: "Số lượng nhập trong khoảng 1-10000",
    },
    valueAsNumber: true,
  },
}

export const WarehouseValidatorError = (error) => {
  return error && (
    <span
      className="peer-focus:font-medium text-sm text-red-500"
      role="alert"
    >
      {error.message}
    </span>
  )
}