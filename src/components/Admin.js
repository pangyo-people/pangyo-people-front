import React, { useMemo } from "react";
import "../css/Header.css";
import Table from "../components/Table";

function Admin() {
  const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "category",
        Header: "Category",
      },
      {
        accessor: "date",
        Header: "Date",
      },
      {
        accessor: "link",
        Header: "Link",
      },
    ],
    []
  );
  // const data = filterItem.map((item) => ({
  //   name: item.org_name,
  //   description: item.org_description,
  //   link: item.org_url,
  // }));
  return (
    <div>
      <header className="header">
        <div className="title">Pangyo-people</div>
      </header>

      {/* <Table columns={columns} data={data} /> */}
    </div>
  );
}

export default Admin;
