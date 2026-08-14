import React, { useState, useEffect } from "react";
import Loading from "./pages/loading/Loading";
import Main from "./pages/main/Main";
import "./app.css";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);
  return <div className="App">{loading ? <Loading /> : <Main />}</div>;
}

export default App;
