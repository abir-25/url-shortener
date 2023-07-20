import React  from 'react';
import './App.css';
import Home from "./pages/Home";
import EditUrl from "./pages/EditUrl";
import UrlList from "./pages/UrlList";
import NavBar from "./component/NavBar";
import {Route, Routes} from "react-router-dom";

function App() {

    return (
    <div className="App">
        <NavBar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/urlList' element={<UrlList />} />
            <Route path='/editUrl' element={<EditUrl />} />
        </Routes>
    </div>
  );
}

export default App;
