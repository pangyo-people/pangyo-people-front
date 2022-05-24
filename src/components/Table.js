import React from "react";
import { useTable } from "react-table";
import "../css/Table.css";
import accessBtn from "../assets/accessBtn.svg";
import cancelBtn from "../assets/cancelBtn.svg";

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, idx) => {
                  if (row.cells.length === idx + 1) {
                    return (
                      <>
                        <td
                          className="tableLink"
                          onClick={() => {
                            window.open(`${cell.value.substr(0,5)==="https"?cell.value:"https://"+cell.value}`, "_blank");
                          }}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      </>
                    );
                  } else {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
