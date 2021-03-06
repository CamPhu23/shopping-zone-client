import CheckboxConfirm from "../../../components/common/checkbox-confirm";
import ImageSlider from "../../../components/common/image-slider";
import { currencyFomatter } from "../../../converter/currency-fomatter";
import { dateFomatter } from "../../../converter/date-formatter";

export const DetailProduct = ({ item, onEditClick, onDeleteClick }) => {
  return (
    item && (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Chi tiết sản phẩm
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Các thông tin chi tiết về sản phẩm
          </p>
        </div>

        <div className="border-y pb-5 border-gray-200 max-h-96 overflow-y-scroll">
          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Mã sản phẩm</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.id}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                Tên sản phẩm
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.name}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Thể loại</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.category}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Giá bán</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {currencyFomatter(item.price)}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                Khuyến mãi
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.discount ? item.discount : "0"}%
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                Đánh giá trung bình
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.ratings.stars !== 0 ? Math.floor(item.ratings.stars) : "Hiện chưa có đánh giá nào"}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 pb-2 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Ngày tạo</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.createdAt ? dateFomatter(item.createdAt) : "Không có dữ liệu"}
              </dd>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">
                Chỉnh sửa gần nhất
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.updatedAt ? dateFomatter(item.updatedAt) : "Không có dữ liệu"}
              </dd>
            </div>
          </div>

          <div className="px-4 pt-5 sm:px-6 flex flex-row">
            <div className="flex-1">
              <dt className="text-sm font-medium text-gray-500">Mô tả</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-all">
                {item.description}
              </dd>
            </div>
          </div>

          {item.images && item.images.length > 0 && (
            <div className="px-4 py-5 sm:px-6 flex flex-row">
              <div className="flex-1">
                <dt className="text-sm font-medium text-gray-500">Hình ảnh</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ImageSlider images={item.images} startIndex={0} />
                </dd>
              </div>
            </div>
          )}
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
