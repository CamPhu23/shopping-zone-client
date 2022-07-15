import { ClientLayout } from '../../layouts/client/client-main.jsx'
import _ from 'lodash'
import { AdminLogInPage } from '../../pages'

const ClientPublicRoutes = ({ component }) => {
  return <ClientLayout component={component} />;
};

const AdminPublicRoutes = () => {
  return <AdminLogInPage/>;
};

export {
  ClientPublicRoutes,
  AdminPublicRoutes,
};