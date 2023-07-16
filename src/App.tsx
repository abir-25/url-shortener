import React from 'react';
import './App.css';
import Home from "./Home";
import EditUrl from "./EditUrl";
import UrlList from "./UrlList";

function App() {
  return (
    <div className="App">
        <Home />
        <EditUrl />
        <UrlList />
    </div>
  );
}

export default App;
