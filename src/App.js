import { React, } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import DevelopersPage from "./components/Developers";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Home/>}/>
        <Route path="/developers" element={<DevelopersPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
