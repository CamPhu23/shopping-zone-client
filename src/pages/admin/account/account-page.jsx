import { useEffect, useState } from "react";
import TopSection from "../../../components/common/main-top-section";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { DetailDialog } from "../../../components/common/dialog";
import { Table } from "../../../components/common/table";
import { Paging } from "../../../components/paging/paging";
import { DEFAULT_PAGE_SIZE } from "../../../constants/default-axios-product";
import { NAVIGATE_URL } from "../../../constants/navigate-url";
import { adminAccountService } from "../../../services/modules";
import { DetailAccount } from "./detail-account";

const AccountPage = () => {
  const [data, setData] = useState({ accounts: [], totalPage: 0, currentPage: 0 });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogParam, setDialogParam] = useState({});
  const [pageInfo, setPageInfo] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    adminAccountService
      .getAllClients()
      .then((response) => {
        if (!_.isEmpty(response)) {
          response.clients = response.clients.map((ele) => {
            let newClient = {
              _id: ele._id,
              username: ele.username ? ele.username : "Tài khoản Google",
              email: ele.email ? ele.email : "",
              fullname: ele.fullname ? ele.fullname : "",
              phone: ele.phone ? ele.phone : "",
              address: ele.address ? ele.address : "",
            }

            return newClient;
          });
        }
        
        setData({ ...data, accounts: response.clients });
      });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dialogParam)) {
      setOpenDialog(true);
    }
  }, [dialogParam]);

  const onCreateNewButtonClick = () => {
    navigate(NAVIGATE_URL.CLIENT_CREATE);
  };

  const onTableRowClick = (id) => {
    adminAccountService
      .getClientById(id)
      .then((data) => {
        setDialogParam(data);
      });
  };

  const handleChangePage = (text, nextPage) => {
    adminAccountService
      .getAllClients(nextPage)
      .then((response) => {
        console.log(response);
        if (!_.isEmpty(response)) {
          response.clients = response.clients.map((ele) => {
            let newClient = {
              _id: ele._id,
              username: ele.username ? ele.username : "Tài khoản Google",
              email: ele.email ? ele.email : "",
              fullname: ele.fullname ? ele.fullname : "",
              phone: ele.phone ? ele.phone : "", 
              address: ele.address ? ele.address : "",
            }

            return newClient;
          });
        }

        setData({ ...data, accounts: response.clients });
        setPageInfo(response.info)
      });
  }

  const onEditClick = (item) => {
    navigate(NAVIGATE_URL.CLIENT_UPDATE, { state: { data: item } });
  };

  const onDeleteClick = (id) => {
    adminAccountService
      .deleteClient(id)
      .then((result) => {
        if (result) {
          const newProducts = data.accounts.filter((account) => account._id !== id);
          setData({ ...data, accounts: newProducts });
          setOpenDialog(false);
        }
      });
  };

  return (
    <div className="flex h-full">
      <div className="w-full flex flex-col relative">
        <TopSection
          titleText="Danh sách khách hàng"
          buttonText="Tạo tài khoản"
          onButtonClick={onCreateNewButtonClick}
        />
        <div className="flex-1">
          <Table
            columns={[
              "Mã tài khoản",
              "Tên tài khoản",
              "Email",
              "Họ và tên",
              "Số điện thoại",
              "Địa chỉ",
            ]}
            data={data.accounts}
            onRowClick={onTableRowClick}
          />
        </div>

        <Paging totalItem={pageInfo.total} numOfShowingPerPage={DEFAULT_PAGE_SIZE}
          handleChangePage={handleChangePage} descriptionText="Tài khoản"
          theme={"dark"}/>

      </div>
      <DetailDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        component={
          <DetailAccount
            item={dialogParam}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        }
      />
    </div>
  );
};

export default AccountPage;