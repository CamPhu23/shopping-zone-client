import { ADMIN_PERMISSION } from '../../constants/authentication';
import {
  AdminDashboardPage,
  AdminProductPage,
  AdminCreateProductPage,
  AdminEditProductPage,
  AdminReceiptPage,
  AdminAccountPage,
  AdminCreateAccountPage,
  AdminEditAccountPage,
  AdminCommentPage,
  AdminWarehousePage,
} from '../../pages';
import { NAVIGATE_URL } from '../../constants/navigate-url'

const PRIVATE_ADMIN_ROUTE = {
  private: true,
  permission: ADMIN_PERMISSION,
};

/*
  OBJECTT look like: {
    path: '',
    component: <Component>,
    private: true | false,
    exact: true | false,
    permission: 'admin' | 'client',
  }
*/

const ADMIN_DASHBOARD_ROUTE = {
  path: '/admin/dashboard',
  component: <AdminDashboardPage />,
  exact: true,
  breadcrumbs: [{ name: "Dashboard", path: "/admin/dashboard" }],
  ...PRIVATE_ADMIN_ROUTE
};

const PRIVATE_PRODUCT_LIST_ROUTE = {
  path: NAVIGATE_URL.PRODUCT_LIST,
  component: <AdminProductPage />,
  breadcrumbs: [
    { name: "Dashboard", path: NAVIGATE_URL.DASHBORAD },
    { name: "Quản lý sản phẩm" },
  ],
  ...PRIVATE_ADMIN_ROUTE,
};

const PRIVATE_PRODUCT_CREATE_ROUTE = {
  path: NAVIGATE_URL.PRODUCT_CREATE,
  component: <AdminCreateProductPage />,
  breadcrumbs: [
    { name: "Dashboard", path: NAVIGATE_URL.DASHBORAD },
    { name: "Quản lý sản phẩm", path: NAVIGATE_URL.PRODUCT_LIST },
    { name: "Thêm sản phẩm" },
  ],
  ...PRIVATE_ADMIN_ROUTE
};

const PRIVATE_PRODUCT_EDIT_ROUTE = {
  path: NAVIGATE_URL.PRODUCT_EDIT,
  component: <AdminEditProductPage />,
  breadcrumbs: [
    { name: "Dashboard", path: NAVIGATE_URL.DASHBORAD },
    { name: "Quản lý sản phẩm", path: NAVIGATE_URL.PRODUCT_LIST },
    { name: "Cập nhật sản phẩm" },
  ],
  ...PRIVATE_ADMIN_ROUTE
};

const PRIVATE_RECEIPT_LIST_ROUTE = {
  path: NAVIGATE_URL.RECEIPTS_LIST,
  component: <AdminReceiptPage />,
  breadcrumbs: [
    { name: "Dashboard", path: NAVIGATE_URL.DASHBORAD },
    { name: "Quản lý hóa đơn" },
  ],
  ...PRIVATE_ADMIN_ROUTE,
};

const PRIVATE_CLIENT_LIST_ROUTE = {
  path: NAVIGATE_URL.CLIENT_LIST,
  component: <AdminAccountPage />,
  breadcrumbs: [
    { name: "Dashboard", path: NAVIGATE_URL.DASHBORAD },
    { name: "Quản lý tài khoản" },
  ],
  ...PRIVATE_ADMIN_ROUTE,
};

const PRIVATE_CLIENT_CREATE_ROUTE = {
  path: NAVIGATE_URL.CLIENT_CREATE,
  component: < AdminCreateAccountPage/>,
  breadcrumbs: [
    { name: "Dashboard", path: NAVIGATE_URL.DASHBORAD },
    { name: "Quản lý tài khoản", path: NAVIGATE_URL.CLIENT_LIST },
    { name: "Tạo tài khoản" },
  ],
  ...PRIVATE_ADMIN_ROUTE
};

const PRIVATE_CLIENT_UPDATE_ROUTE = {
  path: NAVIGATE_URL.CLIENT_UPDATE,
  component: < AdminEditAccountPage/>,
  breadcrumbs: [
    { name: "Dashboard", path: NAVIGATE_URL.DASHBORAD },
    { name: "Quản lý tài khoản", path: NAVIGATE_URL.CLIENT_LIST },
    { name: "Cập nhật tài khoản" },
  ],
  ...PRIVATE_ADMIN_ROUTE
};

const PRIVATE_COMMENT_LIST_ROUTE = {
  path: NAVIGATE_URL.COMMENT_LIST,
  component: <AdminCommentPage />,
  breadcrumbs: [
    { name: "Dashboard", path: NAVIGATE_URL.DASHBORAD },
    { name: "Quản lý bình luận" },
     ],
  ...PRIVATE_ADMIN_ROUTE,
};

const PRIVATE_WAREHOUSE_ROUTE = {
  path: NAVIGATE_URL.WAREHOUSE,
  component: <AdminWarehousePage />,
  breadcrumbs: [
    { name: "Dashboard", path: NAVIGATE_URL.DASHBORAD },
    { name: "Quản lý kho hàng" },
  ],
  ...PRIVATE_ADMIN_ROUTE,
};

export default [
  ADMIN_DASHBOARD_ROUTE,
  PRIVATE_PRODUCT_LIST_ROUTE,
  PRIVATE_PRODUCT_CREATE_ROUTE,
  PRIVATE_PRODUCT_EDIT_ROUTE,
  PRIVATE_RECEIPT_LIST_ROUTE,
  PRIVATE_CLIENT_LIST_ROUTE,
  PRIVATE_CLIENT_CREATE_ROUTE,
  PRIVATE_CLIENT_UPDATE_ROUTE,
  PRIVATE_COMMENT_LIST_ROUTE,
  PRIVATE_WAREHOUSE_ROUTE,
];
