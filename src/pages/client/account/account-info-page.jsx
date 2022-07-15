import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICON } from "../../../assets/svg-icon";
import Toast from "../../../components/toast/toast";
import { accountService } from '../../../services/modules';
import { dateFomatter } from "../../../converter/date-formatter.js";
import { currencyFomatter } from "../../../converter/currency-fomatter";
import { DetailDialog } from "../../../components/common/dialog";
import { Receipt } from "../../../components/receipt/detail-receipt";
import { Paging } from "../../../components/paging/paging";
import { DEFAULT_PAGE_SIZE } from '../../../constants/default-axios-product'
import { CLIENT_AVT } from "../../../constants/avatar-url";
import { RatingProduct } from "../../../components/receipt/rating-product";
import { RECEIPT_CONSTANT } from "../../../constants/receipt";

const AccountInfoPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [toastShow, setToastShow] = useState(false);
  const [toastMessages, setToastMessages] = useState("");
  const [toastIcon, setToastIcon] = useState(null);

  const [showOrderList, setShowOrderList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [dialogParam, setDialogParam] = useState({});

  useEffect(() => {
    accountService
      .getUserInfo()
      .then((info) => setUserInfo(info));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    accountService.updateUserInfo(data)
      .then(() => {
        setToastShow(true);
        setToastMessages("Cập nhật thành công");
        setToastIcon(ICON.Success);
      })
      .catch((e) => {
        setToastShow(true);
        setToastMessages("Cập nhật thất bại");
        setToastIcon(ICON.Fail);
      });

  };

  const onToastCloseClick = () => {
    setToastShow(false);
  };

  const onOrderHistoryClick = () => {
    if (!showOrderList) {
      setLoading(true);

      accountService.getUserOrderHistory(userInfo._id)
        .then((data) => {
          setLoading(false);
          setOrderList(data.receipts);
          setPageInfo(data.info)
          setShowOrderList(true);
        });
    } else if (showOrderList) {
      setShowOrderList(false);
    }
  };

  const onTableRowClick = (id) => {
    setOpenDialog(true);
    accountService
      .getReceiptById(id)
      .then((data) => {
        setDialogParam({});
        setDialogParam(data);
      });
  }

  const onRatingButtonClick = (id) => {
    setOpenRatingDialog(true);
    accountService
      .getReceiptById(id)
      .then((data) => {
        setDialogParam({});

        let product = data.products.map(t1 => ({ ...t1, ...data.ratings.find(t2 => t2.product === t1.id) }))
        data.products = product;

        setDialogParam(data);
      });
  }

  const saveRating = (data) => {
    accountService
      .postRating(data)
      .then(() => {
        setOpenRatingDialog(false);

        setToastShow(true);
        setToastMessages("Đánh giá thành công");
        setToastIcon(ICON.Success);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const handleChangePage = (text, nextPage) => {
    accountService.getUserOrderHistory(userInfo._id, nextPage)
      .then((data) => {
        setLoading(false);
        setOrderList(data.receipts);
        setPageInfo(data.info)
        setShowOrderList(true);
      });
  }

  const validateInput = {
    fullname: {
      required: {
        value: true,
        message: "Họ và tên không được bỏ trống",
      },
    },
    phone: {
      required: {
        value: true,
        message: "Số điện thoại không được bỏ trống",
      },
      minLength: {
        value: 10,
        message: "Số điện thoại phải bao gồm 10 số",
      },
      validate: (value) => {
        return value > 0 ? true : "Số diện thoại phải có dịnh dạng là số";
      },
    },
    email: {
      required: {
        value: true,
        message: "Email không được bỏ trống",
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Email không hợp lệ",
      },
    },
    address: {
      required: {
        value: true,
        message: "Địa chỉ không được bỏ trống",
      },
    },
  };

  const renderInfo = (user) => {
    return (
      <div className="h-full">
        <div className="py-3 md:py-0 border-gray-200 border-2 shadow overflow-hidden sm:rounded-md h-full flex justify-center">
          <div className="self-center bg-white">
            <div className="flow-root pt-4 pb-2">
              <div className="flex flex-col items-center">
                <img
                  className="mb-3 w-24 h-24 rounded-full shadow-lg"
                  src={CLIENT_AVT}
                  alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900">
                  {user.fullname}
                </h5>
                <span className="text-sm text-gray-500">{user.email}</span>
                <div className="flex mt-4 lg:mt-6 sm:w-56">
                  <button
                    onClick={() => onOrderHistoryClick()}
                    className="sm:w-full items-center py-2 px-4 w-full text-md font-medium text-center text-gray-700 border rounded-lg hover:bg-slate-50 hover:text-gray-800"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          role="status"
                          className="w-4 h-4 mr-2 text-gray-200 animate-spin fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        Đang tải dữ liệu
                      </div>
                    ) : showOrderList ? (
                      "Ẩn lịch sử đơn hàng"
                    ) : (
                      "Hiển thị lịch sử đơn hàng"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderError = (error) => {
    return (
      error && (
        <span className="text-red-500" role="alert">
          {error.message}
        </span>
      )
    );
  };

  const renderUserForm = (info) => {
    return (
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-gray-200 border-2 shadow overflow-hidden sm:rounded-md"
        >
          <input
            type="text"
            name="id"
            id="id"
            className="hidden"
            defaultValue={info.id}
            {...register("id")}
          />

          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="lg:grid lg:grid-cols-6 gap-6 space-y-2 lg:space-y-0">
              <div className="col-span-9 sm:col-span-4">
                <label
                  htmlFor="full-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  defaultValue={info.fullname}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  {...register("fullname", validateInput.fullname)}
                />
                {renderError(errors.fullname)}
              </div>

              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  maxLength={10}
                  defaultValue={info.phone}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  {...register("phone", validateInput.phone)}
                />
                {renderError(errors.phone)}
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email-address"
                  id="email-address"
                  defaultValue={info.email}
                  autoComplete="email"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  {...register("email", validateInput.email)}
                />

                {renderError(errors.email)}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  defaultValue={info.address}
                  autoComplete="street-address"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  {...register("address", validateInput.address)}
                />
                {renderError(errors.address)}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
            >
              Cập nhật thông tin
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderOrderList = (orders) => {
    return (
      <div className="mt-5">
        <div className="p-4 flex flex justify-between items-center">
          <div className="font-bold text-2xl">Danh sách lịch sử đơn hàng</div>
          <div className="text-gray-700">Đang hiển thị {pageInfo.currentIndex} trên {Math.ceil(pageInfo.total / pageInfo.currentSize)} trang</div>
        </div>

        <div className="relative overflow-x-auto border-gray-200 border-2 shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Mã đơn hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày đặt hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Phương thức
                </th>
                <th scope="col" className="px-6 py-3">
                  Tổng tiền
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="cursor-pointer bg-white border-b hover:bg-gray-100">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    onClick={() => onTableRowClick(order._id)}
                  >
                    {order._id}
                  </th>
                  <td className="px-6 py-4"
                    onClick={() => onTableRowClick(order._id)}>
                    {dateFomatter(order.createdAt)}
                  </td>
                  <td className="px-6 py-4"
                    onClick={() => onTableRowClick(order._id)}>
                    {order.paymentMethod === "COD" ? order.paymentMethod : "Thẻ tín dụng"}
                  </td>
                  <td className="px-6 py-4"
                    onClick={() => onTableRowClick(order._id)}>
                    {currencyFomatter(order.totalBill)}
                  </td>
                  <td className="px-6 py-4 uppercase" onClick={() => onTableRowClick(order._id)}>{order.status}</td>
                  {order.status == RECEIPT_CONSTANT.RECEIPT_DONE && 
                    (<td className="px-2 py-4 uppercase">
                      <button
                        onClick={() => onRatingButtonClick(order._id)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                      >
                        Đánh giá
                      </button>
                    </td>)
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Paging totalItem={pageInfo.total} numOfShowingPerPage={DEFAULT_PAGE_SIZE}
          handleChangePage={handleChangePage} descriptionText="Hóa đơn" />
      </div>
    );
  };

  return (
    userInfo && (
      <>
        <div className="m-10">
          <div className="md:grid md:grid-cols-3 md:gap-3">
            <div className="md:col-span-1">{renderInfo(userInfo)}</div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              {renderUserForm(userInfo)}
            </div>
          </div>

          {showOrderList && renderOrderList(orderList)}
        </div>

        <DetailDialog
          isOpen={openDialog}
          onClose={() => setOpenDialog(false)}
          component={
            <Receipt
              item={dialogParam}
            />
          }
        />

        <DetailDialog
          isOpen={openRatingDialog}
          onClose={() => setOpenRatingDialog(false)}
          component={
            <RatingProduct
              saveRating={saveRating}
              item={dialogParam}
            />
          }
        />

        <Toast
          show={toastShow}
          messages={toastMessages}
          icon={toastIcon}
          mode={"light"}
          onClose={onToastCloseClick}
          autoClose={5000}
        />
      </>
    )
  );
};

export default AccountInfoPage;
