import React, { useEffect, useState } from "react";
import $ from "jquery"
import Scraper from "./Scraper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from "date-fns/esm/locale"

function Test() {
  const [startDate,setStartDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date());

  // const [text, setText] = useState('올해가 끝났습니다.');
  // useEffect(()=>{
  //   $(".target").mousedown(function () {
  //     setText('나이 한살 추가요')
  //   });
  //   $("button").mouseup(function () {
  //     setText('올해가 끝났습니다.')
  //   });

  //   console.log('changed');
  // }, []);
  console.log(startDate)
  console.log(endDate)

  return (
    <div className="App">
      {/* <button className="target">버튼</button>
      <div>{text}</div>
      <Scraper url="https://www.naver.com"></Scraper> */}
      <DatePicker selected={startDate} onChange={date=>setStartDate(date)} startDate={startDate} endDate={endDate} selectsStart locale={ko} dateFormat="yyyy/MM/dd"/>
      <DatePicker selected={endDate} onChange={date=>setEndDate(date)} startDate={startDate} endDate={endDate} selectsEnd minDate={startDate} locale={ko} dateFormat="yyyy/MM/dd"/>
    </div>
  );
}

export default Test;
