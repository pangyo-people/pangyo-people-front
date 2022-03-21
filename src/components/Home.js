import { React, useState } from "react";
import "../css/Home.css";
import "../css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faList, faRemove } from "@fortawesome/free-solid-svg-icons";
import writeBtn from "../assets/write.svg";
import Modal from "react-modal";
import { Link } from "react-router-dom";

function Home() {
  let [modal, setModal] = useState(false);
  const categorys = [
    "AI",
    "GIS",
    "iOS",
    "경진대회",
    "교육",
    "대외활동",
    "빅데이터",
    "클라우드",
    "프론트엔드",
    "해커톤",
    "컨퍼런스",
  ];
  const images = [
    {
      event_id: "1",
      event_name: "nexon developers conference 2022",
      event_category: "컨퍼런스",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-1.jpg",
      event_permission: "true",
    },
    {
      event_id: "2",
      event_name: "nexon developers conference 2022",
      event_category: "컨퍼런스",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-2.jpg",
      event_permission: "true",
    },
    {
      event_id: "3",
      event_name: "nexon developers conference 2022",
      event_category: "컨퍼런스",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-3.jpg",
      event_permission: "true",
    },
    {
      event_id: "4",
      event_name: "nexon developers conference 2022",
      event_category: "컨퍼런스",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-4.jpg",
      event_permission: "true",
    },
    {
      event_id: "5",
      event_name: "nexon developers conference 2022",
      event_category: "컨퍼런스",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-5.jpg",
      event_permission: "true",
    },
    {
      event_id: "6",
      event_name: "nexon developers conference 2022",
      event_category: "컨퍼런스",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-6.jpg",
      event_permission: "true",
    },
    {
      event_id: "7",
      event_name: "nexon developers conference 2022",
      event_category: "컨퍼런스",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-7.jpg",
      event_permission: "true",
    },
    {
      event_id: "8",
      event_name: "nexon developers conference 2022",
      event_category: "컨퍼런스",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-8.jpg",
      event_permission: "true",
    },
    {
      event_id: "9",
      event_name: "nexon developers conference 2022",
      event_category: "컨퍼런스",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-9.jpg",
      event_permission: "true",
    },
  ];
  const categoryList = categorys.map((element) => <li>{element}</li>);
  const imageList = images.map((element) => (
    //링크 사이트 이미지 가져오는 방법 알아낸 후 event_url 교체하고 적용해야함.
    <div
      className="imageWrap"
      onClick={() => {
        window.open("https://ndc.nexon.com/main?locale=en", "_blank");
      }}
    >
      <div className="eventTitle">{element.event_name}</div>
      <div className="eventInfo">
        <div>분류: {element.event_category}</div>
        <div>주최: {element.host}</div>
        <div>일시: {element.event_date}</div>
      </div>
      <div className="imageWrapScreen">
        <img src={process.env.PUBLIC_URL + `${element.event_url}`} alt="" />
      </div>

      {/* <div class="content_image"><div class="content_image_screen"><img src="https://i.postimg.cc/9MgMR9fs/image1.png"><div class="img_cover"><div class="img_title">DALLI</div></div></div></div> */}
    </div>
  ));


  return (
    <div>
      <header className="header">
        <div className="title">
          <Link to="/">Pangyo-people</Link>
        </div>
        <nav className="navbar">
          <ul>
            <Link to="/developers">
              <li>Developers</li>
            </Link>
            <li>
              <FontAwesomeIcon id="search-btn" icon={faSearch} />
            </li>
          </ul>
        </nav>
      </header>
      <div className="container">
        <div className="category">
          <FontAwesomeIcon id="list-style" icon={faList} />
          <div className="category-list">
            <ul>{categoryList}</ul>
          </div>
        </div>
        <div className="image-container">{imageList}</div>
      </div>

      <img
        className="writeBtn"
        src={writeBtn}
        alt=""
        onClick={() => {
          setModal(true);
        }}
      />

      {/* 모달창 분리해야함 */}
      <Modal className="modal" isOpen={modal}>
        <div className="modal-container">
        <FontAwesomeIcon
          id="remove-btn"
          icon={faRemove}
          onClick={() => {
            setModal(false);
          }}
        />
        <div className="modal-header">게시글 작성</div>
        <div className="modal-body">
          <div>
            <span>행사명</span>{" "}
            <input placeholder="행사명을 입력하세요."></input>
          </div>
          <div>
            <span>카테고리</span>{" "}
            <button onClick>카테고리를 선택해주세요.</button>
          </div>
          <div>
            <span>주최</span>{" "}
            <input placeholder="주최 회사를 입력하세요."></input>
          </div>
          <div>
            <span>날짜</span> <input placeholder="날짜를 입력하세요."></input>
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

export default Home;
