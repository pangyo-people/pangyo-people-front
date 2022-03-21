import { React, useMemo, useState } from "react";
import "../css/Header.css";
import "../css/Developers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Table from "./Table";
import faker from "@faker-js/faker/locale/ko";
import addBtn from "../assets/addBtn.svg";
import Modal from "react-modal";

function DevelopersPage() {
  let [modal, setModal] = useState(false);
  const categorys = ["동아리", "모임", "교육", "정규행사"];
  const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "description",
        Header: "Description",
      },
      {
        accessor: "link",
        Header: "Link",
      },
    ],
    []
  );
  //데이터 변경 필요
  const data = Array(53)
    .fill()
    .map(() => ({
      name: faker.name.lastName() + faker.name.firstName(),
      description: faker.internet.email(),
      link: faker.phone.phoneNumber(),
    }));
  console.log(data);

  const categoryList = categorys.map((element, idx) => (
    <li key={idx}>{element}</li>
  ));
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

        <Table columns={columns} data={data} />
      </div>

      <img
        className="addBtn"
        src={addBtn}
        alt=""
        onClick={() => {
          setModal(true);
        }}
      />

      <Modal className="modal" isOpen={modal}>
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
              <span>이름</span>{" "}
              <input placeholder="동아리/모임/교육/행사명을 입력하세요."></input>
            </div>
            <div>
              <span>카테고리</span>{" "}
              <button onClick>카테고리를 선택해주세요.</button>
            </div>
            <div>
              <span>설명</span> <input placeholder="설명을 입력하세요."></input>
            </div>
            <div>
              <span>URL</span>{" "}
              <input placeholder="사이트 url을 입력하세요."></input>
            </div>

            <button
              className="sendBtn"
              onClick={() => {
                setModal(false);
              }}
            >
              작성
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DevelopersPage;
