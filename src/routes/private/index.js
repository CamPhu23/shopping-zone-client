import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ADMIN_PERMISSION, CLIENT_PERMISSION } from '../../constants/authentication';
import { AdminLayout } from '../../layouts/admin/admin-main.jsx';
import { ClientLayout } from '../../layouts/client/client-main.jsx';
import { UnAuthorizationPage } from '../../pages';

const ClientPrivateRoutes = ({ component, requirePermission }) => {
  const user = useSelector(state => state.auth.user);

  if (_.isEmpty(user)) {
    return <Navigate to="/sign-in" />;
  }

  if (user.permission !== requirePermission) {
    return <UnAuthorizationPage />;
  }

  return <ClientLayout component={component} />;
};

const AdminPrivateRoutes = ({ component, breadcrumbs, requirePermission }) => {
  const user = useSelector(state => state.auth.user);

  if (_.isEmpty(user)) {
    return <Navigate to="/admin/sign-in" />;
  }

  if (user.permission !== requirePermission) {
    return <UnAuthorizationPage />;
  }

  return (
    <AdminLayout
      component={component}
      breadcrumbs={breadcrumbs}
    />
  )
};

export {
  ClientPrivateRoutes,
  AdminPrivateRoutes,
};
