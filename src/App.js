import { React, } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import DevelopersPage from "./components/Developers";
import Test from "./components/Test";
import Admin from "./components/Admin";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Home/>}/>
        <Route path="/developers" element={<DevelopersPage/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;