import React from "react";

const TopSection = ({
  titleText,
  buttonText = "",
  onButtonClick = null,
  buttonEnable = true,
}) => {
  const renderButton = (isEnable, text, onClick) => {
    return (
      isEnable && (
        <button
          type="button"
          className="focus:ring-0 text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-purple-600 hover:bg-purple-700 focus:ring-purple-900"
          onClick={onClick}
        >
          {text}
        </button>
      )
    );
  };

  return (
    <div className="p-6 flex justify-between">
      <div className="text-xl text-slate-100 font-bold text-">{titleText}</div>
      {buttonText && renderButton(buttonEnable, buttonText, onButtonClick)}
    </div>
  );
};

export default TopSection;
