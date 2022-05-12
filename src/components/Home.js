import { React, useState, useMemo, useEffect } from "react";
import "../css/Home.css";
import "../css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faList, faRemove } from "@fortawesome/free-solid-svg-icons";
import writeBtn from "../assets/write.svg";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import Table from "../components/Table";
import {call} from "../service/ApiService";
import Datepicker from "./Datepicker";
import logo from "../assets/logo.png";

function Home() {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState(false);
  const [showTable,setShowTable] = useState(false);
  const [items, setItems] = useState({item:[]});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);
  const [showSearch,setShowSearch] = useState(false);
  const [categoryId,setCategoryId] = useState([]);
  const [inputs, setInputs] = useState({
    eventName: "",
    categories:"",
    host:"",
    startDate:"",
    endDate:"",
    eventUrl:"",
    imageUrl:"",
    eventPermission: "",
  });
  const week=['일','월','화','수','목','금','토'];
  const navigate = useNavigate();
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


  const categorys = [
    { idx: "0", name: "모바일" },
    { idx: "1", name: "프론트엔드" },
    { idx: "2", name: "백엔드" },
    { idx: "3", name: "클라우드" },
    { idx: "4", name: "빅데이터" },
    { idx: "5", name: "AI" },
    { idx: "6", name: "보안" },
    { idx: "7", name: "교육" },
    { idx: "8", name: "경진대회" },
    { idx: "9", name: "동아리" },
    { idx: "10", name: "컨퍼런스" },
    { idx: "11", name: "해커톤" },
  ];
  const categoryList = categorys.map((element,idx) => <li key={idx} className={`${filterCategory.includes(element.idx)? 'active' : ''}`} onClick={()=>{
      !filterCategory.includes(element.idx) ? setFilterCategory([...filterCategory,element.idx]) : setFilterCategory(filterCategory.filter((item)=>item!==element.idx));
    }}>{element.name}</li>);
  const imageList =
  items.item.length > 0 &&
  items.item
    .filter((element) => {
      if (searchTerm === "") {
        return element;
      } else if (
        element.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return element;
      }
    })
    .filter((element)=>{
      if (filterCategory.length===0){
        return element;
      } else if (filterCategory.filter(item=>element.categories.includes(Number(item))).length!==0){
        return element;
      }
    })
    .map((element) => (
      //링크 사이트 이미지 가져오는 방법 알아낸 후 event_url 교체하고 적용해야함.
      <div
        className="imageWrap"
        onClick={() => {
          window.open("https://ndc.nexon.com/main?locale=en", "_blank");
        }}
      >
        <div className="imageWrapScreen">
          <img src={/*process.env.PUBLIC_URL*/"https://"+`${element.imageUrl}`} alt="" />

          <div className="eventText">
            <div className="eventTitle">{element.eventName}</div>
            <div className="eventInfo">
              <div>분류: {element.categories.map(item=>categorys[item].name+" ")}</div>
              <div>주최: {element.host}</div>
              <div>일시: {element.startDate} ~ {element.endDate}</div>
            </div>
          </div>
        </div>
      </div>
    ));
    console.log(items)

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
    items.item.filter((element) => {
      if (searchTerm === "") {
        return element;
      } else if (
        element.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return element;
      }
    })
    .filter((element)=>{
      if (filterCategory.length===0){
        return element;
      } else if (filterCategory.filter(item=>element.categories.includes(Number(item))).length!==0){
        return element;
      }
    })
    .map((item) => ({
      name: item.eventName,
      category: item.categories.map(element=>categorys[element].name+" "),
      host: item.host,
      link: item.eventUrl,
    }));

  
  const {eventName, host, Date, eventUrl} = inputs;
  const onInputChange = (e) =>{
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]:value,
    })
  }

  const add = (item) =>{
    item.eventPermission="false";
    item.categories=categoryId.map(Number).sort((a,b)=>a-b);
    call("/v1/api/event/write","POST",item)
    .then((response)=>
    setItems({item:response}))
    console.log(item)
  }
  const onSubmit = ()=>{
    add(inputs);
    setInputs({
        eventName: "",
        categories:"",
        host:"",
        startDate:"",
        endDate:"",
        eventUrl:"",
        imageUrl:"",
        eventPermission: "",
    });
    setCategoryId([]);
    setMessage(true);
  }
  const dateFunc = (startDate,endDate) =>{
    // var startdate = startDate.getFullYear().toString()+"-"+(startDate.getMonth()+1).toString()+"-"+startDate.getDate().toString()+"("+week[startDate.getDay()]+")"
    // var enddate = endDate.getFullYear().toString()+"-"+(endDate.getMonth()+1).toString()+"-"+endDate.getDate().toString()+"("+week[endDate.getDay()]+")"
    var startdate = startDate.getFullYear().toString()+"-"+(startDate.getMonth()+1).toString()+"-"+startDate.getDate().toString()
    var enddate = endDate.getFullYear().toString()+"-"+(endDate.getMonth()+1).toString()+"-"+endDate.getDate().toString()
    setInputs({
      ...inputs,
      startDate:startdate,
      endDate:enddate
    })
  }

  return (
    <div>
      <header className="header">
        <div className="title" onClick={()=>{window.location.replace("/")}}>
            <img className="logoImg" src={logo}></img>
        </div>
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            id="search-box"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        )}
        <nav className="navbar">
          <ul>
            <Link to="/archive">
              <li className="archive">Archive</li>
            </Link>
            <li>
              <FontAwesomeIcon
                className="search-btn"
                icon={faSearch}
                onClick={() => {
                  setShowSearch(!showSearch);
                  setSearchTerm("");
                }}
              />
            </li>
          </ul>
        </nav>
      </header>
      <div className="container">
        <div className="category">
          <FontAwesomeIcon
            className="list-style"
            icon={faList}
            onClick={() => {
              setShowTable(!showTable);
            }}
          />
          <div className="category-list">
            <ul>{categoryList}</ul>
          </div>
        </div>
        {showTable && <Table columns={columns} data={data} />}
        {!showTable && <div className="image-container">{imageList}</div>}
      </div>

      <img
        className="writeBtn"
        src={writeBtn}
        alt=""
        onClick={() => {
          setModal(true);
        }}
      />

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
            <div className="modal-content">
              <span>행사명</span>{" "}
              <input
                onChange={onInputChange}
                name="eventName"
                value={eventName}
                placeholder="행사명을 입력하세요."
              ></input>
            </div>
            <div className="modal-content">
              <span className="categoryTitle">카테고리</span>
              <div className="categorys">
                {categorys.map((element) => (
                  <button
                    className={
                      "categoryList" +
                      `${categoryId.includes(element.idx) ? "Select" : ""}`
                    }
                    onClick={() => {
                      !categoryId.includes(element.idx)
                        ? setCategoryId((item) => [...item, element.idx])
                        : setCategoryId(
                            categoryId.filter(
                              (button) => button !== element.idx
                            )
                          );
                    }
                }
                    name="categories"
                    value={element.idx}
                  >
                    {element.name}
                  </button>
                ))}
              </div>
              {/* </select> */}
            </div>
            <div className="modal-content">
              <span>주최</span>{" "}
              <input
                name="host"
                value={host}
                onChange={onInputChange}
                placeholder="주최 기관을 입력하세요."
              ></input>
            </div>
            <div className="modal-content">
              <span>날짜</span>{" "}
              <div className="datePicker">
                <Datepicker
                  name="Date"
                  dateFunc={dateFunc}
                  value={Date}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="modal-content">
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

      <Modal ariaHideApp={false} className="modal" isOpen={message}>
        <div className="message-container">
          <div className="message-body">
            <div>작성이 완료되었습니다.</div>
            <div>관리자 승인 후 확인하실 수 있습니다.</div>
            <button
              className="sendBtn"
              onClick={() => {
                setMessage(false);
                window.location.replace("/");
              }}
            >
              확인
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
