import { CLIENT_PERMISSION } from '../../constants/authentication';
import { PaymentPage } from '../../pages';
import { AccountInfoPage } from '../../pages';

const PRIVATE_CLIENT_ROUTE = {
  private: true,
  permission: CLIENT_PERMISSION,
};

const USER_INFO_ROUTE = {
  path: '/user-info',
  component: <AccountInfoPage />,
  exact: true,
  ...PRIVATE_CLIENT_ROUTE
}

/*
  OBJECTT look like: {
    path: '',
    component: <Component>,
    private: true | false,
    exact: true | false,
    permission: 'admin' | 'client',
  }
*/
const CLIENT_PAYMENT_ROUTE = {
  path: '/payment',
  component: <PaymentPage />,
  exact: true,
  ...PRIVATE_CLIENT_ROUTE
};


export default [
  USER_INFO_ROUTE,
  CLIENT_PAYMENT_ROUTE,
  USER_INFO_ROUTE,
];