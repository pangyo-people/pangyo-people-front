import React, { useState } from "react";
import "../css/Header.css";
import "../css/Developers.css";
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

function DevelopersPage() {
    let [modal, setModal] = useState(false);
    let [page,setPage] = useState(0);

    let [inputs, setInputs] = useState({
      org_id: "",
      org_name: "",
      org_description: "",
      org_url: "",
      org_category: "",
      org_permission: "",
    });
  
    let [items, setItems] = useState([
      {
        org_id: "1",
        org_name: "DDD",
        org_description: "개발자와 디자이너가 함께하는 사이드 프로젝트",
        org_url: "https://www.notion.so/dddset/DDD-7b73ca41b67c4658b292a4662581ee01",
        org_category: "0",
        org_permission: "true",
      },
      {
        org_id: "2",
        org_name: "한이음",
        org_description: "대학생 멘티와 지도교수, 기업전문가 ICT멘토가 팀을 이루어 실무 프로젝트를 수행",
        org_url: "https://www.hanium.or.kr/portal/hanium/businessOverview.do",
        org_category: "0",
        org_permission: "true",
      },
      {
        org_id: "3",
        org_name: "양재동 코드랩",
        org_description: "",
        org_url: "https://www.codelabs.kr/",
        org_category: "1",
        org_permission: "true",
      },
      {
        org_id: "4",
        org_name: "스프린트 서울",
        org_description: "",
        org_url: "https://sprintseoul.org/",
        org_category: "2",
        org_permission: "true",
      },
      {
        org_id: "5",
        org_name: "TeamH4C",
        org_description: "",
        org_url: "https://www.facebook.com/teamh4c/",
        org_category: "3",
        org_permission: "true",
      },
    ]);

    const categorys = [
      {idx: "0", name: "동아리"}, 
      {idx: "1", name: "모임"}, 
      {idx: "2", name: "교육"}, 
      {idx: "3", name: "정규행사"}
    ];
  
    const categoryList = categorys.map((element, idx) => (
      <li className={`${page===idx? 'active' : ''}`} onClick={()=>onClickHandler(idx)} key={idx}>{element.name}</li>
    ));

    const obj = { 
      0:<Clubs items={items}/>,
      1:<Meetings items={items}/>,
      2:<Educations items={items}/>,
      3:<Sessions items={items}/>,
    }
    const onClickHandler = (id) =>{
      setPage(id);
    }

    
  const { org_name, org_description, org_url, org_category } = inputs;
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
    const thisItems = items;
    item.id = thisItems.length;
    item.org_permission = "true";
    thisItems.push(item);
    setItems(thisItems);
    console.log(items)
  };

  const onSubmit = () => {
    add(inputs);
    setInputs({
      org_id: "",
      org_name: "",
      org_description: "",
      org_url: "",
      org_category: "",
      org_permission: "",
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
              <input name="org_name" value={org_name} onChange={onInputChange} placeholder="동아리/모임/교육/행사명을 입력하세요."></input>
            </div>
            <div>
              <span>카테고리</span>
              <select onChange={onInputChange} name="org_category" options={categorys} value={org_category}>
                {categorys.map((element) => (
                  <option key={element.idx}  defaultValue="0" value={element.idx}>
                    {element.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span>설명</span> <input name="org_description" value={org_description} onChange={onInputChange} placeholder="설명을 입력하세요."></input>
            </div>
            <div>
              <span>URL</span>
              <input name="org_url" value={org_url} onChange={onInputChange} placeholder="사이트 url을 입력하세요."></input>
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