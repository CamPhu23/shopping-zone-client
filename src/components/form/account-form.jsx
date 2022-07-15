import { useForm } from "react-hook-form";
import { EDIT_FORM_TYPE } from "../../constants/variables";
// import { categoryService } from "../../services/modules";
import { AccountValidator, AccountValidatorError } from "../../validators/account-validator";

const AccountForm = ({ type, handleSubmitForm, item = null }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Submit form
  const onSubmitForm = async (data) => {
    handleSubmitForm(data);
  };

  return (
    <form className="mx-4 mt-6" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="flex flex-row mb-4">
        <div className={`w-full pr-5 ${type !== EDIT_FORM_TYPE && "sm:w-1/2"}`}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="username"
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 text-white border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              defaultValue={item?.username ? item.username : (type === EDIT_FORM_TYPE ? "Tài khoản Google" : "")}   
              {...register("username", AccountValidator.username)}
              readOnly={type === EDIT_FORM_TYPE ? true : false}
            />
            <label
              htmlFor="username"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tên tài khoản
            </label>
            {AccountValidatorError(errors.username)}
          </div>
        </div>

        {(type !== EDIT_FORM_TYPE) &&
          (<div className="w-full sm:w-1/2">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="password"
                placeholder=" "
                defaultValue={""}
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 text-white border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("password", AccountValidator.password)}
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mật khẩu
              </label>
              {AccountValidatorError(errors.password)}
            </div>
          </div>)
        }
      </div>

      <div className="flex flex-row mb-4">
        <div className="w-full sm:w-1/2 pr-5">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="fullname"
              placeholder=" "
              defaultValue={item ? item.fullname : ""}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 text-white border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              {...register("fullname")}
            />
            <label
              htmlFor="fullname"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Họ và tên
            </label>
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              placeholder=" "
              defaultValue={item ? item.email : ""}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 text-white border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              readOnly={type === EDIT_FORM_TYPE ? true : false}
              {...register("email", AccountValidator.email)}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            {AccountValidatorError(errors.email)}
          </div>
        </div>
      </div>

      <div className="flex flex-row mb-4">
        <div className="w-full sm:w-1/2 pr-5">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="phone"
              placeholder=" "
              defaultValue={item ? item.phone : ""}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 text-white border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              {...register("phone")}
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Số điện thoại
            </label>
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="address"
              placeholder=" "
              defaultValue={item ? item.address : ""}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 text-white border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              {...register("address")}
            />
            <label
              htmlFor="address"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Địa chỉ
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="flex items-start">
          <button
            type="submit"
            className="mr-4 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            {type === EDIT_FORM_TYPE ? "Cập nhật" : "Tạo mới"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AccountForm;