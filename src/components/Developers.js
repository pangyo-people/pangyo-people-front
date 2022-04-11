import React, { useState, useEffect } from "react";
import "../css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import addBtn from "../assets/addBtn.svg";
import Modal from "react-modal";
import Meetings from "./Meetings";
import Educations from "./Educations";
import Sessions from "./Sessions";
import Clubs from "./Clubs";
import Select from "react-select";
import {call} from "../service/ApiService"

function DevelopersPage() {
    let [modal, setModal] = useState(false);
    let [page,setPage] = useState(0);

    let [inputs, setInputs] = useState({
      orgName: "",
      orgDescription: "",
      orgUrl: "",
      orgCategory: "",
      orgPermission: "",
    });
  
    let [items, setItems] = useState({item:[]});

    const categorys = [
      {idx: "0", name: "동아리", data:"CLUBS"}, 
      {idx: "1", name: "모임", data:"MEETINGS"}, 
      {idx: "2", name: "교육", data:"EDUCATIONS"}, 
      {idx: "3", name: "정규행사", data:"SESSIONS"}
    ];
  
    const categoryList = categorys.map((element, idx) => (
      <li className={`${page===idx? 'active' : ''}`} onClick={()=>onClickHandler(idx)} key={idx}>{element.name}</li>
    ));

    const obj = { 
      0:<Clubs/>,
      1:<Meetings/>,
      2:<Educations/>,
      3:<Sessions/>,
    }
    const onClickHandler = (id) =>{
      setPage(id);
    }

    
  const { orgName, orgDescription, orgUrl, orgCategory } = inputs;
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(name)
    console.log(value)
  };

  const add = (item) => {
    console.log(item);
    item.orgPermission = "false";
    call("/v1/api/org/write","POST",item)
    .then((response)=>
    setItems({item:response}))
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
          <Link to="/">Pangyo-people</Link>
        </div>
        <nav className="navbar">
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <li>
              <FontAwesomeIcon id="search-btn" icon={faSearch} />
            </li>
          </ul>
        </nav>
      </header>

      <div className="container">
        <div className="category">
          <div className="org-category-list">
            <ul>{categoryList}</ul>
          </div>
        </div>
        {obj[page]}
      </div>

      <img
        className="addBtn"
        src={addBtn}
        alt=""
        onClick={() => {
          setModal(true);
        }}
      />

      <Modal ariaHideApp={false} className="modal" isOpen={modal}>
        <div className="modal-container">
          <FontAwesomeIcon
            id="remove-btn"
            icon={faRemove}
            onClick={() => {
              setModal(false);
            }}
          />
          <div className="modal-header">정보 추가</div>
          <div className="modal-body">
            <div>
              <span>이름</span>
              <input name="orgName" value={orgName} onChange={onInputChange} placeholder="동아리/모임/교육/행사명을 입력하세요."></input>
            </div>
            <div>
              <span>카테고리</span>
              <select onChange={onInputChange} name="orgCategory" options={categorys} value={orgCategory}>
                {categorys.map((element) => (
                  <option key={element.idx} value={element.data}>
                    {element.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span>설명</span> <input name="orgDescription" value={orgDescription} onChange={onInputChange} placeholder="설명을 입력하세요."></input>
            </div>
            <div>
              <span>URL</span>
              <input name="orgUrl" value={orgUrl} onChange={onInputChange} placeholder="사이트 url을 입력하세요."></input>
            </div>

            <button
              className="sendBtn"
              onClick={() => {
                setModal(false);
                onSubmit();
              }}
            >
              작성
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DevelopersPage