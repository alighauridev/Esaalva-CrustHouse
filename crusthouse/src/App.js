import React, { useEffect } from "react";
import { Route, useLocation, Routes } from "react-router-dom";
import AOS from "aos";
import { focusHandling } from "cruip-js-toolkit";
import "./input.css";
import "./css/style.scss";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Pay from "./pages/Pay";
import Sales from "./pages/Sales";
import Store from "./pages/Store";
import Header from "./partials/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <div className="app ml-[90px]">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/order" element={<Order />}></Route>
          {/* <Route
            path="/pay"
            element={<Pay timestamp={new Date().getTime().toString()} />}
          ></Route> */}
          <Route path="/sales" element={<Sales />}></Route>
          <Route path="/store" element={<Store />}></Route>
        </Routes>
        <ToastContainer />
      </div>
      <Header />
    </>
  );
}

export default App;
