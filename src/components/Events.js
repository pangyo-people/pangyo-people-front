import React, { useMemo, useState, useEffect } from "react";
import "../css/Header.css";
import Table from "./Table";
import {call} from "../service/ApiService";
import accessBtn from "../assets/accessBtn.svg";
import cancelBtn from "../assets/cancelBtn.svg";

function Events() {
  const [items, setItems]= useState({item:[]})
  const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "created",
        Header: "Created",
      },
      {
        accessor: "link",
        Header: "Link",
      },
    ],
    []
  );
  useEffect(()=>{
    call("/v1/api/events","GET",null).then((response)=>
    setItems({item:response}));
    console.log(items)
  },[])

  const filterItem = items.item.length > 0 && items.item.filter(element => element.eventPermission === false);
  const data = filterItem.length > 0 &&
    filterItem.map((item) => ({
      name: item.eventName,
      link: item.eventUrl,
      created: item.eventCreated,
    }));

  return (
    <div>
      {data.length > 0 && <Table columns={columns} data={data} />}
      <img
        className="accessBtn"
        src={accessBtn}
        alt=""
      />
    <img
        className="cancelBtn"
        src={cancelBtn}
        alt=""
      />
    </div>
  );
}

export default Events;
