import React, {useState} from 'react';
import './App.css';
import Home from "./pages/Home";
import EditUrl from "./pages/EditUrl";
import UrlList from "./pages/UrlList";
import BackgroundAnimation from "./component/BackgroundAnimation";
import InputShortener from "./Tuto/InputShortener";
import LinkResult from "./Tuto/LinkResult";

function App() {
    const [inputValue, setInputValue] = useState("");

    return (
    <div className="App">
        {/*<InputShortener setInputValue={setInputValue} />*/}
        {/*<LinkResult inputValue={inputValue} />*/}

        <Home />
        {/*<EditUrl />*/}
        {/*<UrlList />*/}
        {/*<BackgroundAnimation />*/}
    </div>
  );
}

export default App;
