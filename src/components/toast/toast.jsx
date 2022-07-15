import React, { useEffect, useState } from "react";
import { ICON } from "../../assets/svg-icon";
import "./toast.css";

const Toast = ({
  show,
  messages,
  icon = null,
  autoClose = 3000,
  mode = "dark", //2 modes: 'dark' and 'light'
  onClose,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) setIsVisible(true);
    setIsShow(show);
  }, [show]);

  useEffect(() => {
    let autoHide;
    if (isShow && isVisible) {
      autoHide = setTimeout(() => {
        onCloseClick();
      }, autoClose);
    }

    return () => {
      if (autoHide) clearTimeout(autoHide);
    };
  }, [isShow, isVisible]);

  const classes = `${isVisible ? "visible" : "hidden"} ${
    isVisible ? (isShow ? "toast-show-fadein" : "toast-show-fadeout") : ""
  }`;

  const onCloseClick = () => {
    onClose();

    setIsShow(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 450);
  };

  const renderIcon = () => {
    return (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
        {icon || ICON.Info}
      </div>
    );
  };

  return (
    <div className={`fixed z-50 top-6 right-2 md:right-6 ${classes}`}>
      <div
        id="toast-default"
        className={`flex items-center w-full max-w-sm p-3 border rounded-lg shadow-md 
          ${
            mode === "light"
              ? "bg-gray-100 text-gray-800"
              : "text-gray-300 bg-gray-700 border-gray-700"
          }`}
        role="alert"
      >
        {renderIcon()}
        <div className="ml-3 text-sm font-normal">{messages}</div>
        <button
          type="button"
          className={`ml-6 -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 ${
            mode === "light"
              ? "text-gray-400 hover:text-black"
              : "text-gray-500 hover:text-white"
          }`}
          onClick={onCloseClick}
        >
          <span className="sr-only">Đóng</span>
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
