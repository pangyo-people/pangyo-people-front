import React, { useMemo, useState, useEffect } from "react";
import "../css/Header.css";
import Table from "./Table";
import {call} from "../service/ApiService"

function Clubs(props) {
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
  const searchTerm = props.searchTerm;

  useEffect(()=>{
    var loading = true;
    if(loading){
      call("/v1/api/org/CLUBS","GET",null).then((response)=>
      setItems({item:response}));
    }
    return () => {
      loading=false;
    }
  },[setItems])

  const filterItem = items.item.length > 0 && items.item.filter((element) => {
    if (searchTerm === "") {
      return element;
    } else if (
      element.orgName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return element;
    }
  }).filter(element => element.orgCategory === "CLUBS" && element.orgPermission === true);
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

export default Clubs;
