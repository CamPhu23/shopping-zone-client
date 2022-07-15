import CheckboxConfirm from "../../../components/common/checkbox-confirm";
import ImageSlider from "../../../components/common/image-slider";
import { currencyFomatter } from "../../../converter/currency-fomatter";
import { dateFomatter } from "../../../converter/date-formatter";

export const DetailAccount = ({ item, onEditClick, onDeleteClick }) => {
  const calculateTotalBill = () => {
    return item.receipts && item.receipts.map((r) => r.totalBill)
      .reduce((a, b) => a + b, 0);
  }

  return (
    item && (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Chi tiết tài khoản
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Các thông tin chi tiết về tài khoản
          </p>
        </div>

        <div className="border-y pb-5 border-gray-200 max-h-96 overflow-y-scroll">
          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Mã tài khoản</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item._id}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                Tên tài khoản
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.username ? item.username : "Tài khoản Google"}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Họ và tên</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.fullname || "Chưa cập nhật"}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                Email
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.email || "Chưa cập nhật"}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Số điện thoại</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.phone || "Chưa cập nhật"}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Địa chỉ</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.address || "Chưa cập nhật"}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                Tổng hóa đơn
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.receipts && item.receipts.length}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                Tổng tiền hóa đơn
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {currencyFomatter(calculateTotalBill())}
              </dd>
            </div>
          </div>
        </div>

        <CheckboxConfirm
          item={item}
          onDelete={onDeleteClick}
          onEdit={onEditClick}
        />
      </div>
    )
  );
};
