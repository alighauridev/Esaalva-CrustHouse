import React, { Component, useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Item4 from "../images/chicken-crispy.png";
import Pay from "./Pay";
import axios from "axios";
import {
  getProducts,
  getProductsByClass,
} from "../Redux/actions/productActions";
import ContentLoader from "react-content-loader";
import { addToCart } from "../Redux/actions/cartActions";
import ProductModal from "../components/ProductModal";
const Order = () => {
  const [category, setCategory] = useState();
  const dispatch = useDispatch();
  const [classId, setClassId] = useState(false);
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState("")
  const availableProducts = useSelector((state) => state.Products);
  const { loading, items } = availableProducts;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get("/api/v1/class");
        setCategory(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, [dispatch]);
  const categoryHandler = (id) => {
    if (id === "all") {
      dispatch(getProducts());
    } else {
      dispatch(getProductsByClass(id));
    }
  };
  const MyLoader = () => (
    <ContentLoader
      speed={2}
      width={300}
      height={280}
      viewBox="0 0 300 280"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="5" ry="5" width="300" height="200" />
      <rect x="20" y="220" rx="5" ry="5" width="100" height="30" />
      <rect x="180" y="220" rx="5" ry="5" width="100" height="30" />
    </ContentLoader>
  );
  return (
    <div className="flex flex-col min-h-screen overflow-hidden py-4">
      <main className="grid grid-cols-5 ">
        <div className="px-4   flex col-span-3 h-[fit-content] flex-wrap items-center justify-center max-w-3xl mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-4 pl-10 pr-4 text-gray-700 bg-white rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
            />
            <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.5 15.5L20 20"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 18C6.686 18 4 15.314 4 12c0-3.314 2.686-6 6-6s6 2.686 6 6c0 1.743-.734 3.318-1.912 4.438l4.324 4.324"
                />
              </svg>
            </div>
          </div>
          <div className="class__btns flex flex-wrap  gap-3 mt-5 w-[100%] justify-center">
            {category?.map((item, index) => {
              return (
                <button
                  onClick={() => categoryHandler(item._id)}
                  className="py-3 px-4  text-xl bg-white shadow-lg rounded-lg"
                >
                  {item.class_name}
                </button>
              );
            })}
            <button
              onClick={() => categoryHandler("all")}
              className="py-3 px-4  text-xl bg-white shadow-lg rounded-lg"
            >
              All
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-3 gap-2 mt-5">
              <MyLoader />
              <MyLoader />
              <MyLoader />
            </div>
          ) : items.length ? (
            <>
              <div className="grid grid-cols-3 gap-2 mt-5">
                {items.map((item, ind) => {
                  return (
                    <button
                      className={
                        "bg-white  flex-shrink-0  relative overflow-hidden rounded-lg max-w-xs shadow-lg transform transition-all duration-300 scale-100 hover:scale-95 cursor-pointer"
                      }
                      key={item.id}
                      onClick={() => {
                        setModal(true)
                        setClassId(item.product_id.class_id._id);
                        setProduct(item.product_id._id)
                      }}
                    >
                      <div className="relative text-white px-4 pb-4 mt-4">
                        <img src={Item4} />
                        <span className="block opacity-75 -mb-1 text-black font-semibold text-left">
                          {item.product_id.name}
                        </span>
                        <div className="md:flex justify-between">
                          <span className="block font-semibold text-black text-md md:text-xl text-left">
                            {item.product_id.class_id.class_name}
                          </span>
                          <span className="block bg-white rounded-full text-purple-500 md:ml-4 mt-2 md:mt-0 text-xs font-bold px-3 py-2 leading-none flex items-center">
                            {item.product_id.price}PKR
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

            </>
          ) : (
            <div className="mt-3 py-10">No item found</div>
          )}
        </div>

        <div className="col-span-2 ">
          <Pay />
        </div>
      </main >
      <ProductModal isOpen={modal} setModal={setModal} product={product} classId={classId} />
    </div >
  );
};

export default Order;
