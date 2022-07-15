import { AdminLogInPage } from '../../pages';
import { ADMIN_PERMISSION } from '../../constants/authentication';

const PUBLIC_ADMIN_ROUTE = {
  private: false,
  permission: ADMIN_PERMISSION,
};

const ADMIN_SIGN_IN_ROUTE = {
  path: '/admin/sign-in',
  component: <AdminLogInPage />,
  exact: true,
  ...PUBLIC_ADMIN_ROUTE
};

export default [
  ADMIN_SIGN_IN_ROUTE,
];