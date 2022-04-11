import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/Datepicker.css";
import {ko} from "date-fns/esm/locale"

function Datepicker(props) {
  const [startDate,setStartDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date());

  useEffect(()=>{
    submitText()
  },[startDate,endDate])

  const submitText = () =>{
    props.dateFunc(startDate,endDate)
  }


  return (
    <div className="datePicker">
      <DatePicker className="startDate" selected={startDate} onChange={date=>setStartDate(date)} startDate={startDate} endDate={endDate} selectsStart locale={ko} dateFormat="yyyy/MM/dd"/>
      <DatePicker className="endDate" selected={endDate} onChange={date=>setEndDate(date)} startDate={startDate} endDate={endDate} selectsEnd minDate={startDate} locale={ko} dateFormat="yyyy/MM/dd"/>
    </div>
  );
}

export default Datepicker;
