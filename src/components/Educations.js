import React, { useMemo, useState } from "react";
import "../css/Header.css";
import "../css/Developers.css";
import Table from "./Table";
import faker from "@faker-js/faker/locale/ko";

function Educations(props) {
  const [items, setItems]= useState(props.items)
    const columns = useMemo(
        () => [
          {
            accessor: "name",
            Header: "Name",
          },
          {
            accessor: "description",
            Header: "Description",
          },
          {
            accessor: "link",
            Header: "Link",
          },
        ],
        []
      );
      const filterItem = items.filter(element => element.org_category === "2");
      const data = 
        filterItem.map((item) => ({
          name: item.org_name,
          description: item.org_description,
          link: item.org_url,
        }));

  return (
    <div>
        <Table columns={columns} data={data} />
    </div>
  )
}

export default Educations