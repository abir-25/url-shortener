import React, {useState} from 'react';
import './App.css';
import Home from "./pages/Home";
import EditUrl from "./pages/EditUrl";
import UrlList from "./pages/UrlList";
import InputShortener from "./Tuto/InputShortener";
import LinkResult from "./Tuto/LinkResult";
import NavBar from "./component/NavBar";
import {Route, Routes} from "react-router";

function App() {
    const [inputValue, setInputValue] = useState("");

    return (
    <div className="App">
        {/*<InputShortener setInputValue={setInputValue} />*/}
        {/*<LinkResult inputValue={inputValue} />*/}
        <NavBar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/urlList' element={<UrlList />} />
        </Routes>
        {/*<EditUrl />*/}
        {/*<UrlList />*/}
    </div>
  );
}

export default App;
