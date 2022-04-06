import { React, useState, useMemo, useEffect } from "react";
import "../css/Home.css";
import "../css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faList, faRemove } from "@fortawesome/free-solid-svg-icons";
import writeBtn from "../assets/write.svg";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import {call} from "../service/ApiService";

function Home() {
  const [modal, setModal] = useState(false);
  const [visible,setVisible] = useState(false);
  const [items, setItems] = useState({item:[]});
  const [inputs, setInputs] = useState({
    eventName: "",
    eventCategory:"",
    host:"",
    eventDate:"",
    eventUrl:"",
    eventPermission: "",
  });

  useEffect(()=>{
    call("/v1/api/events","GET",null).then((response)=>
    setItems({item:response}));
  },[])

  const categorys = [
    { idx: "0", name: "AI" },
    { idx: "1", name: "Android" },
    { idx: "2", name: "iOS" },
    { idx: "3", name: "경진대회" },
    { idx: "4", name: "교육" },
    { idx: "5", name: "빅데이터" },
    { idx: "6", name: "동아리" },
    { idx: "7", name: "멘토링" },
    { idx: "8", name: "보안" },
    { idx: "9", name: "컨퍼런스" },
    { idx: "10", name: "클라우드" },
    { idx: "11", name: "프로젝트" },
  ];

  const categoryList = categorys.map((element,idx) => <li key={idx} >{element.name}</li>);
  const imageList = items.item.length > 0 && items.item.map((element) => (
    //링크 사이트 이미지 가져오는 방법 알아낸 후 event_url 교체하고 적용해야함.
    <div
      className="imageWrap"
      onClick={() => {
        window.open("https://ndc.nexon.com/main?locale=en", "_blank");
      }}
    >
      <div className="imageWrapScreen">
        <img src={process.env.PUBLIC_URL + `${element.eventUrl}`} alt="" />

        <div className="eventText">
          <div className="eventTitle">{element.eventName}</div>
          <div className="eventInfo">
            {/* <div>분류: {categorys[element.eventCategory].name}</div> */}
            <div>주최: {element.host}</div>
            <div>일시: {element.eventDate}</div>
          </div>
        </div>
      </div>
    </div>
  ));

  const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "category",
        Header: "Category"
      },
      {
        accessor: "host",
        Header: "Host",
      },
      {
        accessor: "link",
        Header: "Link",
      },
    ],
    []
  );
  const data = items.item.length > 0 &&
    items.item.map((item) => ({
      name: item.eventName,
      category: item.eventCategory,
      host: item.host,
      link: item.eventUrl,
    }));
  
  const {eventName, eventCategory, host, eventDate, eventUrl} = inputs;
  const onInputChange = (e) =>{
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]:value,
    })
    console.log(name)
    console.log(value)
  }

  const add = (item) =>{
    item.eventPermission="false";
    call("/v1/api/events/write","POST",item)
    .then((response)=>
    setItems({item:response}))
  }

  const onSubmit = ()=>{
    add(inputs);
    setInputs({
      eventName: "",
      eventCategory:"",
      host:"",
      eventDate:"",
      eventUrl:"",
      eventPermission: "",
    })
  }

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
          <FontAwesomeIcon
            id="list-style"
            icon={faList}
            onClick={() => {
              setVisible(!visible);
            }}
          />
          <div className="category-list">
            <ul>{categoryList}</ul>
          </div>
        </div>
        {visible && <Table columns={columns} data={data} />}
        {!visible && <div className="image-container">{imageList}</div>}
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
      <Modal className="modal" isOpen={modal} ariaHideApp={false}>
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
              <input
                onChange={onInputChange}
                name="eventName"
                value={eventName}
                placeholder="행사명을 입력하세요."
              ></input>
            </div>
            <div>
              <span>카테고리</span>{" "}
              <select onChange={onInputChange} name="eventCategory"value={eventCategory}>
                {categorys.map((element) => (
                  <option key={element.idx} defaultValue="0" value={element.idx}>
                    {element.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span>주최</span>{" "}
              <input
                name="host"
                value={host}
                onChange={onInputChange}
                placeholder="주최 기관을 입력하세요."
              ></input>
            </div>
            <div>
              <span>날짜</span>{" "}
              <input
                name="eventDate"
                value={eventDate}
                onChange={onInputChange}
                placeholder="날짜를 입력하세요."
              ></input>
            </div>
            <div>
              <span>URL</span>{" "}
              <input
                name="eventUrl"
                value={eventUrl}
                onChange={onInputChange}
                placeholder="사이트 url을 입력하세요."
              ></input>
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
  );
}

export default Home;
