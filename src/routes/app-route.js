import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminPrivateRoutes, ClientPrivateRoutes } from "./private";
import { ADMIN_PERMISSION, CLIENT_PERMISSION } from "../constants/authentication";
import { AdminPublicRoutes, ClientPublicRoutes } from "./public";
import { NotFoundPage } from "../pages";

const AppRoute = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route) => {
        if (route.private) {
          if (route.permission === ADMIN_PERMISSION) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <AdminPrivateRoutes
                    breadcrumbs={route.breadcrumbs}
                    requirePermission={ADMIN_PERMISSION}
                    component={route.component}
                  />
                }
              />
            );
          } else if (route.permission === CLIENT_PERMISSION) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ClientPrivateRoutes
                    requirePermission={CLIENT_PERMISSION}
                    component={route.component}
                  />
                }
              />
            );
          }
        } else {
          if (route.permission === ADMIN_PERMISSION) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<AdminPublicRoutes component={route.component} />}
              />
            );
          }
          else {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<ClientPublicRoutes component={route.component} />}
              />
            );
          }
        }
      })}
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  );
};

export default AppRoute;
