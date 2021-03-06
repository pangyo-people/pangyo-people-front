import React, { useMemo, useState, useEffect } from "react";
import "../css/Header.css";
import Table from "./Table";
import {call} from "../service/ApiService"

function Educations() {
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
    var loading = true;
    if(loading){
      call("/v1/api/org/EDUCATIONS","GET",null).then((response)=>
      setItems({item:response}));
    }
    return () => {
      loading=false;
    }
  },[setItems])

  const filterItem = items.item.length > 0 && items.item.filter(element => element.orgCategory === "EDUCATIONS" && element.orgPermission === true);
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

export default Educations;
