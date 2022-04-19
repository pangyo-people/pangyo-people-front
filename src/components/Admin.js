import React, { useState } from "react";
import "../css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Organizations from "./Organizations";
import Events from "./Events";
import {call} from "../service/ApiService"


function Admin() {
  let [page, setPage] = useState(0);

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
    1: <Organizations />,
  };
  const onClickHandler = (id) => {
    setPage(id);
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
