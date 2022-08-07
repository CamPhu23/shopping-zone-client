import _ from "lodash";
import React from "react";
import { useEffect } from "react";
import { currencyFomatter } from "../../converter/currency-fomatter.js"
import { RECEIPT_CONSTANT } from '../../constants/receipt.js'

export const Table = ({ columns, data, onRowClick = null, theme = "dark" }) => {
  if (!columns || columns.length <= 0 || !data || data.length <= 0) {
    return <></>;
  }

  const isClickable = !_.isNull(onRowClick) ? "cursor-pointer" : "";

  return (
    <table className={`w-full text-sm text-left mb-10 border border-solid border-slate-700
    ${theme === "dark" ? "text-gray-400" : ""}`}>
      <thead className={`text-xs uppercase bg-gray-50 
      ${theme === "dark" ? "bg-gray-700 text-gray-400" : "border-2 border-slate-200"}`}>
        <tr>
          {columns.map((column, index) => {
            return (
              <th key={index} scope="col" className="px-6 py-3 text-center">
                {column}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={isClickable}>
        {data.map((item, index) => {
          const values = Object.values(item);
          return (
            <tr
              key={index}
              onClick={() => onRowClick && onRowClick(item._id)}
              className={`bg-white border-b hover:bg-gray-50 
              ${theme === "dark" ? "hover:bg-gray-600 bg-gray-800 border-gray-700" : "border-2 border-slate-200"}`}
            >
              {values.map((ele, index) => {
                return (
                  <td
                    key={index}
                    className={`px-6 py-4 whitespace-normal text-center 
                    ${(!_.isEmpty(ele) && RECEIPT_CONSTANT.STATUS.includes(ele)) ? "font-semibold" : " "}
                    ${RECEIPT_CONSTANT.RECEIPT_DONE == ele ? "text-green-500" : " "}
                    ${RECEIPT_CONSTANT.RECEIPT_IN_PROGRESS == ele ? "text-yellow-500" : " "}
                    ${RECEIPT_CONSTANT.RECEIPT_SUCCESS == ele ? "text-blue-500" : " "}`}
                  >
                    {(!_.isEmpty(ele) || _.isNumber(ele))
                      ?
                      Array.isArray(ele) ? ele.join(", ") : (typeof ele === "number" ? currencyFomatter(ele) : (RECEIPT_CONSTANT.STATUS.includes(ele) ? ele.toUpperCase() : ele))
                      :
                      "Chưa cập nhật"
                    }
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};