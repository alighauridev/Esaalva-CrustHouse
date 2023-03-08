import React, { Component, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderForm from "../components/OrderForm";
import Item4 from "../images/chicken-crispy.png";

import Recipe from "../partials/Recipe";
import { addToCart, removeCart } from "../Redux/actions/cartActions";

const Pay = () => {
  const Cart = useSelector((state) => state.Cart);
  const [open, setOpen] = React.useState(false);

  const { cartItems } = Cart;
  const dispatch = useDispatch();
  const removeCartNow = (item) => {
    dispatch(removeCart(item.product));
  };
  const qtyHandler = (item, check) => {
    if (check === "add" && item.qty < 5) {
      dispatch(addToCart(item.product, Number(item.qty + 1)));
    }
    if (check === "remove" && item.qty > 1) {
      dispatch(addToCart(item.product, Number(item.qty - 1)));
    }

  };
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);
  return (
    <div className="container max-w-5xl mx-auto     ">
      <section className="cart  bg-white px-4 py-3   border- overflow-hidden rounded-lg shadow-lg">
        <div className="flex">
          {" "}
          <h1 className="font-bold text-xl text-3xl ">Cart</h1>
        </div>
        <div className="cart__items">
          {cartItems.map((item, index) => {
            return (
              <div
                className="bg-white   w-full pl-3 pr-4 rounded-lg my-2"
                style={{ border: "1px solid #e0e0e052" }}
              >
                <div className="relative text-gray-500  pb-2 mt-2">
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="p-2 w-16">
                        <img src={Item4} />
                      </div>

                      <div className="flex items-center justify-center flex-col text-md">
                        <div className="w-[100%]">   {item.class_id.class_name}</div>
                        <div className="font-bold">{item.title}</div>
                      </div>
                    </div>

                    <div className="flex gap-3  w-18 font-medium items-center">

                      <div className="flex flex-row border h-8 rounded-xl relative">
                        <span
                          className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold pt-1 px-4 rounded-l"
                          onClick={() => dispatch(qtyHandler(item, "remove"))}
                          disabled={item.qty === 1}
                        >
                          <span className="m-auto">-</span>
                        </span>

                        <input
                          className="text-center font-bold bg-white w-10 text-xs md:text-base flex items-center justify-center cursor-default"
                          readOnly
                          name="custom-input-number"
                          value={item.qty}
                        />

                        <span
                          className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold pt-1 px-4 rounded-r"
                          onClick={() => dispatch(qtyHandler(item, "add"))}
                        // disabled={item.qty === item.countInStock}
                        >
                          <span className="m-auto">+</span>
                        </span>
                      </div>
                      <button
                        className="w-5 h-5  hover:bg-red-200 rounded-full  cursor-pointer text-red-700"
                        onClick={() => removeCartNow(item)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-trash-2 "
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="total">
          <div
            className="flex justify-between items-center px-4 py-3 rounded-lg my-2 "
            style={{ border: "1px solid #e0e0e052" }}
          >
            <div className="font-bold">Sub Total</div>
            <div>{total}</div>
          </div>
          <div
            className="flex justify-between items-center px-4 py-3 my-2 rounded-lg"
            style={{ border: "1px solid #e0e0e052" }}
          >
            <div className="font-bold">Tax</div>
            <div>0.00</div>
          </div>
          <div
            className="flex justify-between items-center px-4 py-5 my-2 rounded-lg"
            style={{ border: "1px solid #e0e0e052" }}
          >
            <div className="font-bold text-2xl">Total</div>
            <div className="font-bold text-2xl">{total}PKR</div>
          </div>
        </div>
        <button onClick={() => setOpen(!open)} class="bg-blue-500 w-[100%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" >
          Create Order
        </button>

      </section>
      <OrderForm setOpen={setOpen} open={open} />
    </div>

  );
};

export default Pay;
