import React, { useMemo, useState, useEffect } from "react";
import "../css/Header.css";
import Table from "./Table";
import {call} from "../service/ApiService"

function Meetings() {
  const [items, setItems]= useState({item:[]})
  const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "이름",
      },
      {
        accessor: "description",
        Header: "설명",
      },
      {
        accessor: "link",
        Header: "링크",
      },
    ],
    []
  );

  useEffect(()=>{
    call("/v1/api/org/MEETINGS","GET",null).then((response)=>
    setItems({item:response}));
  },[])

  const filterItem = items.item.length > 0 && items.item.filter(element => element.orgCategory === "MEETINGS");
  const data = filterItem.length > 0 &&
    filterItem.map((item) => ({
      name: item.orgName,
      description: item.orgDescription,
      link: item.orgUrl,
    }));

  return (
    <div>
      {data.length > 0 && <Table columns={columns} data={data} />}
    </div>
  );
}

export default Meetings;
