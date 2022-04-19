import React, { useMemo, useState, useEffect } from "react";
import "../css/Header.css";
import TableAdmin from "./TableAdmin";
import {call} from "../service/ApiService"

function Organizations() {
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
    call("/v1/api/admin/orgs","GET",null).then((response)=>
    setItems({item:response}));
  },[])

  const data = items.item.length > 0 &&
    items.item.map((item) => ({
      name: item.orgName,
      created: item.orgCreated,
      link: item.orgUrl,
      id: item.orgId,
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

export default Organizations;
