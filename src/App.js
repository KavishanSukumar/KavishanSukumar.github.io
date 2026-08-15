import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Loading from "./pages/loading/Loading";
import Main from "./pages/main/Main";
import heroImg from "./assets/me-5.webp";
import "./app.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Minimum display time so the loading state feels intentional & smooth (no 10ms flash)
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 550));

    // Wait for the full DOM and external resources (styles, images) to be loaded
    const pageLoadPromise = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        const onLoad = () => {
          window.removeEventListener("load", onLoad);
          resolve();
        };
        window.addEventListener("load", onLoad);
      }
    });

    // Wait for custom typography/fonts to be ready to prevent FOUT / layout shift
    const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve();

    // Preload critical hero avatar image
    const imagePreloadPromise = new Promise((resolve) => {
      const img = new Image();
      img.src = heroImg;
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });

    // Fallback safety timeout so network issues never hang the page indefinitely
    const fallbackTimer = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
      }
    }, 3000);

    Promise.all([
      minTimePromise,
      pageLoadPromise,
      fontsPromise,
      imagePreloadPromise,
    ]).then(() => {
      clearTimeout(fallbackTimer);
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {loading ? <Loading key="loading" /> : <Main key="main" />}
      </AnimatePresence>
    </div>
  );
}

export default App;

