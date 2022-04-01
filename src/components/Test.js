import React from "react";
import axios from "axios";
import { ReactTinyLink } from "react-tiny-link";
import SwaggerUI from "swagger-ui-react";

function Test() {

  const requestOptions = {
    method: "GET",
    headers: {"Content-Type": "application/json"}
  }

  fetch("http://eb-pgpp-restapi-dev-tokyo-001.ap-northeast-1.elasticbeanstalk.com/v1/api/events", requestOptions)
  .then((response)=> response.json())
  .then((response)=>
    console.log(response)
  )
  // axios
  //   .get(
  //     "/swagger/v1/api/events"
  //   )
  //   .then((data) => {
  //     console.log(data);
  //   });

  return (
    <div className="App">
      <h1>Hello CodeSandbox123123</h1>
      {/* <ReactTinyLink url="/" /> */}
      <h2>Start editing to see some magic happen!</h2>
      {/* <SwaggerUI url="https://devqwerty-restapi.pgpp.co.kr/v1/api/events"/> */}
    </div>
  );
}

export default Test;
