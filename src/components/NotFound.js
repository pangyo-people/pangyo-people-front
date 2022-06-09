import React from 'react'
import character from "../assets/character.png";
import "../css/NotFound.css";
import {Link} from "react-router-dom";
function NotFound() {
  return (
    <div className='container'>
      <img className="characterImg" src={character}></img>
      <div className='notTitle'>PAGE NOT FOUND</div>
      <div className='notContent'>페이지 경로가 잘못되었을 수 있습니다.<br/> 메인 페이지로 돌아가시려면 아래 버튼을 눌러주세요.</div>
      <Link to="/"><button className='backBtn'>Go Back Home</button></Link>
    </div>

  )
}

export default NotFound