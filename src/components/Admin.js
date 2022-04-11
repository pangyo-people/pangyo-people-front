import React, { useState } from "react";
import "../css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Meetings from "./Meetings";
import Events from "./Events";
import {call} from "../service/ApiService"


function Admin() {
  let [page, setPage] = useState(0);

  let [inputs, setInputs] = useState({
    orgName: "",
    orgDescription: "",
    orgUrl: "",
    orgCategory: "",
    orgPermission: "",
  });

  let [items, setItems] = useState({ item: [] });

  const categorys = [
    { idx: "0", name: "Events" },
    { idx: "1", name: "Organization" },
  ];

  const categoryList = categorys.map((element, idx) => (
    <li
      className={`${page === idx ? "active" : ""}`}
      onClick={() => onClickHandler(idx)}
      key={idx}
    >
      {element.name}
    </li>
  ));

  const obj = {
    0: <Events />,
    1: <Meetings />,
  };
  const onClickHandler = (id) => {
    setPage(id);
  };

  const { orgName, orgDescription, orgUrl, orgCategory } = inputs;
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(name);
    console.log(value);
  };

  const add = (item) => {
    console.log(item);
    item.orgPermission = "false";
    call("/v1/api/org/write", "POST", item).then((response) =>
      setItems({ item: response })
    );
    console.log(items);
  };

  const onSubmit = () => {
    add(inputs);
    setInputs({
      orgName: "",
      orgDescription: "",
      orgUrl: "",
      orgCategory: "",
      orgPermission: "",
    });
  };

  return (
    <div>
      <header className="header">
        <div className="title">
          <Link to="/admin">Pangyo-people</Link>
        </div>
      </header>

      <div className="container">
        <div className="category">
          <div className="org-category-list">
            <ul>{categoryList}</ul>
          </div>
        </div>
        {obj[page]}
      </div>
    </div>
  );
}

export default Admin;
