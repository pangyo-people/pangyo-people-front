import React, { useMemo, useState, useEffect } from "react";
import "../css/Header.css";
import TableAdmin from "./TableAdmin";
import {call} from "../service/ApiService";

function Events() {
  const [items, setItems]= useState({item:[]})
  const columns = useMemo(
    () => [
      {
        accessor: "id",
        Header: "Id",
      },
      {
        accessor: "name",
        Header: "이름",
      },
      {
        accessor: "link",
        Header: "링크",
      },
      {
        accessor: "created",
        Header: "작성일",
      },
    ],
    []
  );
  useEffect(()=>{
    var loading = true;
    if(loading){
      call("/v1/api/events","GET",null).then((response)=>
      setItems({item:response}));
    }
    return () => {
      loading=false;
    }
  },[setItems]);

  const filterData=items.item.length>0 && items.item.filter((element)=>element.eventPermission===false) 
  const data = filterData.length > 0 &&
    filterData.map((item) => ({
      name: item.eventName,
      link: item.eventUrl,
      created: item.eventCreated,
      id: item.eventId,
    }));

    const updateItem=(item)=>{
      call(`/v1/api/admin/orgs/${item}`,"PUT",null).then((response)=>
        setItems({item:response})
      );
    }
  
    const deleteItem=(item)=>{
      call(`/v1/api/admin/orgs/${item}`,"DELETE",null).then((response)=>
        setItems({item:response})
      );
    };
  
    return (
      <div>
        {data.length > 0 && <TableAdmin columns={columns} data={data} updateItem={updateItem} deleteItem={deleteItem} />}
      </div>
    );
}

export default Events;
