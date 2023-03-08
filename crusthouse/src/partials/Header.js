import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation().pathname;

  return (
    <div className="bg-white fixed left-0 top-0 z-20  border-t border-gray-200 flex flex-col  h-[100%] w-[90px] shadow-lg">
      <Link
        to="/"
        className="flex flex-grow items-center justify-center p-2 text-blue-500 hover:text-blue-500"
      >
        <div className="text-center">
          <span className="block h-8 text-2xl sm:text-3xl leading-8">
            <i className="mdi mdi-newspaper-variant-outline"></i>
          </span>
          <span className="block text-xs leading-none">Home</span>
        </div>
      </Link>
      <Link
        to="/order"
        className="flex flex-grow items-center justify-center p-2 text-blue-500 hover:text-blue-500"
      >
        <div className="text-center">
          <span className="block h-8 text-2xl sm:text-3xl leading-8">
            <i className="mdi mdi-newspaper-variant-outline"></i>
          </span>
          <span className="block text-xs leading-none">Order</span>
        </div>
      </Link>
    </div>
  );
}


export default Header;
