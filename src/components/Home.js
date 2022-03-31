import { React, useState, useMemo } from "react";
import "../css/Home.css";
import "../css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faList, faRemove } from "@fortawesome/free-solid-svg-icons";
import writeBtn from "../assets/write.svg";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Table from "../components/Table";

function Home() {
  const [modal, setModal] = useState(false);
  const [visible,setVisible] = useState(false);
  const [items, setItems] = useState([
    {
      event_id: "1",
      event_name: "nexon developers conference 2022",
      event_category: "9",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-1.jpg",
      event_permission: "true",
    },
    {
      event_id: "2",
      event_name: "nexon developers conference 2022",
      event_category: "9",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-2.jpg",
      event_permission: "true",
    },
    {
      event_id: "3",
      event_name: "nexon developers conference 2022",
      event_category: "9",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-3.jpg",
      event_permission: "true",
    },
    {
      event_id: "4",
      event_name: "nexon developers conference 2022",
      event_category: "8",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-4.jpg",
      event_permission: "true",
    },
    {
      event_id: "5",
      event_name: "nexon developers conference 2022",
      event_category: "1",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-5.jpg",
      event_permission: "true",
    },
    {
      event_id: "6",
      event_name: "nexon developers conference 2022",
      event_category: "2",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-6.jpg",
      event_permission: "true",
    },
    {
      event_id: "7",
      event_name: "nexon developers conference 2022",
      event_category: "3",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-7.jpg",
      event_permission: "true",
    },
    {
      event_id: "8",
      event_name: "nexon developers conference 2022",
      event_category: "4",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-8.jpg",
      event_permission: "true",
    },
    {
      event_id: "9",
      event_name: "nexon developers conference 2022",
      event_category: "6",
      host: "Gloand Korea",
      event_date: "03.31(목) 20:00~22:00",
      event_url: "/assets/img-9.jpg",
      event_permission: "true",
    },
  ]);
  const [inputs, setInputs] = useState({
    event_id:"",
    event_name: "",
    event_category:"",
    host:"",
    event_date:"",
    event_url:"",
    event_permission: "",
  });
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

  const categoryList = categorys.map((element,idx) => <li key={idx}>{element.name}</li>);
  const imageList = items.map((element) => (
    //링크 사이트 이미지 가져오는 방법 알아낸 후 event_url 교체하고 적용해야함.
    <div
      className="imageWrap"
      onClick={() => {
        window.open("https://ndc.nexon.com/main?locale=en", "_blank");
      }}
    >
      <div className="imageWrapScreen">
        <img src={process.env.PUBLIC_URL + `${element.event_url}`} alt="" />

        <div className="eventText">
          <div className="eventTitle">{element.event_name}</div>
          <div className="eventInfo">
            <div>분류: {categorys[element.event_category].name}</div>
            <div>주최: {element.host}</div>
            <div>일시: {element.event_date}</div>
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
  const data = 
    items.map((item) => ({
      name: item.event_name,
      category: item.event_category,
      host: item.host,
      link: item.event_url,
    }));
  
  const {event_name, event_category, host, event_date, event_url} = inputs;
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
    const thisItems = items;
    item.id = thisItems.length;
    item.event_permission="true";
    thisItems.push(item);
    setItems(thisItems);
    console.log(items)
  }

  const onSubmit = ()=>{
    add(inputs);
    setInputs({
      event_id:"",
      event_name: "",
      event_category:"",
      host:"",
      event_date:"",
      event_url:"",
      event_permission: "",
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
                name="event_name"
                value={event_name}
                placeholder="행사명을 입력하세요."
              ></input>
            </div>
            <div>
              <span>카테고리</span>{" "}
              <select onChange={onInputChange} name="event_category"value={event_category}>
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
                name="event_date"
                value={event_date}
                onChange={onInputChange}
                placeholder="날짜를 입력하세요."
              ></input>
            </div>
            <div>
              <span>URL</span>{" "}
              <input
                name="event_url"
                value={event_url}
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
