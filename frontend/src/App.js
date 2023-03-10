import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import "./index.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          }
        />

        <Route
          path="/:id"
          element={
            <ProtectedRouter>
              <SingleProduct />
            </ProtectedRouter>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRouter>
              <Cart />
            </ProtectedRouter>
          }
        />

        {/* <Route path="/products" element={
            <ProtectedRouter>
              <Products />
            </ProtectedRouter>
          } />
          <Route path="/cart" element={
            <ProtectedRouter>
              <Cart />
            </ProtectedRouter>
          } />
          <Route path="/bills" element={
            <ProtectedRouter>
              <Bills />
            </ProtectedRouter>
          } />
          <Route path="/customers" element={
            <ProtectedRouter>
              <Customers />
            </ProtectedRouter>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />  */}
      </Routes>
    </>
  );
}

export default App;

export function ProtectedRouter({ children }) {
  if (!localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}