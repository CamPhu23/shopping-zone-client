import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../../services/actions/auth-action";
import { Navbar } from "./navbar";
import { Breadscrum } from "../../components/common/breadcrumb";
import { adminAccountService } from "../../services/modules";
import _ from "lodash"

export const AdminLayout = ({ component, breadcrumbs, ...rest }) => {
  const [userInfo, setUserInfo] = useState({ username: "" });
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutRequest());
  };

  useEffect(() => {
    adminAccountService
      .getUserInfo()
      .then(info => setUserInfo({ username: info }));
  }, []);

  return (
    <div className="flex flex-row h-screen bg-slate-300">
      <Navbar userInfo={userInfo} onSignOut={onLogout} />
      <div className="flex-1 h-full">
        <div className="p-8 flex flex-col h-screen">
          <Breadscrum breadcrumbs={breadcrumbs} />
          <div className="flex-1 mt-4 py-3 px-5 text-gray-700 rounded-lg border bg-gray-800 border-gray-700 overflow-y-scroll no-scrollbar">
            {component}
          </div>
        </div>
      </div>
    </div>
  )
};