import "./App.css";
import img1 from "./images/img-1.jpg";
import img2 from "./images/img-2.jpg";
import img3 from "./images/img-3.jpg";
import img4 from "./images/img-4.jpg";
import img5 from "./images/img-5.jpg";
import img6 from "./images/img-6.jpg";
import img7 from "./images/img-7.jpg";
import img8 from "./images/img-8.jpg";
import img9 from "./images/img-9.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faList } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div>
      <div className="header">
        <div className="title">Pangyo-people</div>
        <nav className="navbar">
          <ul>
            <li>Developers</li>
            <li>
              <FontAwesomeIcon id="search-btn" icon={faSearch} />
            </li>
          </ul>
        </nav>
      </div>
      <div className="container">
        <div className="category">
          <FontAwesomeIcon id="list-style" icon={faList} />
          <div className="category-list">
            <ul>
              <li>AI</li>
              <li>GIS</li>
              <li>iOS</li>
              <li>경진대회</li>
              <li>교육</li>
              <li>대외활동</li>
              <li>빅데이터</li>
              <li>클라우드</li>
              <li>프론트엔드</li>
              <li>해커톤</li>
              <li>컨퍼런스</li>
            </ul>
          </div>
        </div>
        <div className="image-container">
          <div className="imageWrap"><img src={img1} alt="" /></div>
          <div className="imageWrap"><img src={img2} alt="" /></div>
          <div className="imageWrap"><img src={img3} alt="" /></div>
          <div className="imageWrap"><img src={img4} alt="" /></div>
          <div className="imageWrap"><img src={img5} alt="" /></div>
          <div className="imageWrap"><img src={img6} alt="" /></div>
          <div className="imageWrap"><img src={img7} alt="" /></div>
          <div className="imageWrap"><img src={img8} alt="" /></div>
          <div className="imageWrap"><img src={img9} alt="" /></div>
        </div>
      </div>
    </div>
  );
}

export default App;
