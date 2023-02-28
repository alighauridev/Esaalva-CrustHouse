import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "../src/Redux/store/store.js";
import { ToastContainer, toast } from "react-toastify";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
