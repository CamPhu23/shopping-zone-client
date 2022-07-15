import { useEffect, useState } from "react";
import TopSection from "../../../components/common/main-top-section";
// import Pagination from "../../../components/common/pagination";
import { Table } from "../../../components/common/table";
import { adminProductService } from "../../../services/modules";
import { DEFAULT_PAGE_NUMBER, NUMBER_RECORD_PER_PAGE } from "../../../constants/variables.js";
import { DetailDialog } from "../../../components/common/dialog";
import { DetailProduct } from "./detail-product";
import { useNavigate } from "react-router-dom";
import { NAVIGATE_URL } from "../../../constants/navigate-url";
import { numberToStringConverter } from "../../../converter/data-type.js"
import _ from "lodash";
import { DEFAULT_PAGE_SIZE } from "../../../constants/default-axios-product";
import { Paging } from "../../../components/paging/paging";

const ProductPage = () => {
  const [data, setData] = useState({ products: [], totalPage: 0, currentPage: 0 });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogParam, setDialogParam] = useState({});
  const [pageInfo, setPageInfo] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    adminProductService
      .getAllProducts()
      .then((response) => {
        response
          && response.products.map(ele => ele.discount = numberToStringConverter(ele.discount));
        setData({ ...data, products: response.products });
      });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dialogParam)) {
      setOpenDialog(true);
    }
  }, [dialogParam]);

  const onCreateNewButtonClick = () => {
    navigate(NAVIGATE_URL.PRODUCT_CREATE);
  };

  const onTableRowClick = (id) => {
    adminProductService
      .getProductById(id)
      .then((data) => {
        setDialogParam(data);
      });
  };

  const handleChangePage = (text, nextPage) => {
    adminProductService
      .getAllProducts(nextPage)
      .then((response) => {
        response
          && response.products.map(ele => ele.discount = numberToStringConverter(ele.discount));
        setData({ ...data, products: response.products });
        setPageInfo(response.info)
      });
  }

  const onEditClick = (item) => {
    navigate(NAVIGATE_URL.PRODUCT_EDIT, { state: { data: item } });
  };

  const onDeleteClick = (id) => {
    adminProductService
      .deleteProductById(id)
      .then((result) => {
        if (result) {
          const newProducts = data.products.filter((product) => product._id !== id);
          setData({ ...data, products: newProducts });
          setOpenDialog(false);
        }
      });
  };

  return (
    <div className="flex h-full">
      <div className="w-full flex flex-col relative">
        <TopSection
          titleText="Danh sách sản phẩm"
          buttonText="Thêm sản phẩm"
          onButtonClick={onCreateNewButtonClick}
        />
        <div className="flex-1">
          <Table
            columns={[
              "Mã sản phẩm",
              "Tên sản phẩm",
              "Giá tiền",
              "Giảm giá (%)",
              "Thể loại",
              "Đặc trưng",
            ]}
            data={data.products}
            onRowClick={onTableRowClick}
          />
        </div>
        
        <Paging totalItem={pageInfo.total} numOfShowingPerPage={DEFAULT_PAGE_SIZE}
          handleChangePage={handleChangePage} theme={"dark"}/>
          
      </div>
      <DetailDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        component={
          <DetailProduct
            item={dialogParam}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        }
      />
    </div>
  );
};

export default ProductPage;
