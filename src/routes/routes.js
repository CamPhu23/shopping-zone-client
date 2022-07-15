import CLIENT_PRIVARE_ROUTES from "./private/client-private-route";
import CLIENT_PUBLIC_ROUTES from "./public/client-public-route";
import ADMIN_PRIVARE_ROUTES from "./private/admin-private-route";
import ADMIN_PUBLIC_ROUTES from "./public/admin-public-route";

export default [
  ...CLIENT_PRIVARE_ROUTES,
  ...CLIENT_PUBLIC_ROUTES,
  ...ADMIN_PRIVARE_ROUTES,
  ...ADMIN_PUBLIC_ROUTES
];