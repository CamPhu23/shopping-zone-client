import { useEffect, useState } from "react";
import TopSection from "../../../components/common/main-top-section";
// import Pagination from "../../../components/common/pagination";
import _ from "lodash";
import { DetailDialog } from "../../../components/common/dialog";
import { Table } from "../../../components/common/table";
import { adminReceiptSevice } from "../../../services/modules";
import { DetailReceipt } from "./detail-receipt";
import Toast from "../../../components/toast/toast";
import { ICON } from "../../../assets/svg-icon";
import { DEFAULT_PAGE_SIZE } from "../../../constants/default-axios-product";
import { Paging } from "../../../components/paging/paging";

const ReceiptPage = () => {
  const [toastShow, setToastShow] = useState(false);
  const [toastMessages, setToastMessages] = useState("");
  const [toastIcon, setToastIcon] = useState(null);

  const [data, setData] = useState({ receipts: [], totalPage: 0, currentPage: 0 });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogParam, setDialogParam] = useState({});
  const [pageInfo, setPageInfo] = useState({});

  const updateUI = () => {
    adminReceiptSevice
      .getAllReceipts()
      .then((response) => {
        setData({ ...data, receipts: response.receipts });
      });
  }

  useEffect(() => {
    updateUI();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dialogParam)) {
      setOpenDialog(true);
    }
  }, [dialogParam]);

  const onTableRowClick = (id) => {
    adminReceiptSevice
      .getReceiptById(id)
      .then((data) => {
        setDialogParam(data);
      });
  };

  const handleChangePage = (text, nextPage) => {
    adminReceiptSevice
      .getAllReceipts(nextPage)
      .then((response) => {
        setData({ ...data, receipts: response.receipts });
        setPageInfo(response.info)
      });
  }

  const onEditClick = (item) => {
    adminReceiptSevice.
      postReceiptStatus(item)
      .then((data) => {
        setOpenDialog(false);
        updateUI();

        setToastShow(true);
        setToastMessages("Cập nhật thành công");
        setToastIcon(ICON.Success);
      })
      .catch(e => {
        console.log(e);

        setToastShow(true);
        setToastMessages("Cập nhật thất bại");
        setToastIcon(ICON.Fail);
      });
  };

  return (
    <div className="flex h-full">
      <div className="w-full flex flex-col relative">
        <TopSection
          titleText="Danh sách hóa đơn"
        />
        <div className="flex-1">
          <Table
            columns={[
              "Mã hóa đơn",
              "Tên khách hàng",
              "Số điện thoại",
              "Email",
              "Phương thức thanh toán",
              "Tổng tiền",
              "Trạng thái"
            ]}
            data={data.receipts}
            onRowClick={onTableRowClick}
          />
        </div>

        <Paging totalItem={pageInfo.total} numOfShowingPerPage={DEFAULT_PAGE_SIZE}
          handleChangePage={handleChangePage} descriptionText="Hóa đơn"
          theme={"dark"} />

      </div>
      <DetailDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        component={
          <DetailReceipt
            item={dialogParam}
            onEditClick={onEditClick}
          />
        }
      />

      <Toast
        show={toastShow}
        messages={toastMessages}
        icon={toastIcon}
        mode={"light"}
        onClose={() => setToastShow(false)}
        autoClose={5000}
      />
    </div>
  );
};

export default ReceiptPage;
