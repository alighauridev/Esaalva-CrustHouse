import React, { useState, useEffect } from "react";
import axios from "axios";
import LayoutApp from "../../components/Layout";
import { Row, Col } from "antd";
import Product from "../../components/Product";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../../scss/product.scss";
const SingleProduct = () => {
    const dispatch = useDispatch();

    const [productData, setProductData] = useState({
        image: "",
        price: 0,
        name: "",
    });
    const [relatedProducts, setRelatedProducts] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                dispatch({
                    type: "SHOW_LOADING",
                });
                const { data } = await axios.get(`/api/v1/products/${id}`);
                setProductData(data.product);
                setRelatedProducts(data.relatedProducts);
                dispatch({
                    type: "HIDE_LOADING",
                });
                console.log(productData);
            } catch (error) {
                console.log(error);
            }
        };

        getAllProducts();
    }, [dispatch, navigate]);

    return (
        <LayoutApp>
            <section className="prod__info">
                <div className="container">
                    <div className="grid">
                        <div className="item">
                            <div className="gallery">
                                <div className="img">
                                    <img src={productData.image} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="top__detail">
                                <div className="title">
                                    <h2>{productData.name}</h2>
                                    <div>
                                        <span>
                                            Status:{" "}
                                            {productData.stock > 0 ? "Available" : "Unavailable"}
                                        </span>
                                        {/*  */}
                                    </div>
                                </div>
                                <div className="price">
                                    <h2></h2>
                                    <h2>${productData.price}</h2>
                                </div>
                                <div
                                    className="description"
                                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                                >
                                    <h3>Branch:</h3>
                                    <h2>{productData.branch}</h2>
                                </div>
                                <div className="rating"> </div>
                            </div>
                            <h3>Related Items:</h3>
                            <div className="quantity">
                                <div className="qty">
                                    {relatedProducts
                                        .filter((i) => i._id !== id)
                                        .map((item, index) => {
                                            return (
                                                <div
                                                    className="item"
                                                    onClick={() => navigate(`/${item._id}`)}
                                                >
                                                    <div className="img">
                                                        <img src={item.image} alt="" />
                                                    </div>
                                                    <div className="details">
                                                        <div className="top">
                                                            <h3 className="start">{item.name}</h3>
                                                            <div className="end">{item.branch}</div>
                                                        </div>
                                                        <div className="bottom">
                                                            <div className="start">${item.price}</div>
                                                            <div className="end"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>

                                <div className="buy"></div>
                            </div>
                        </div>
                    </div>
                    <div className="tabs__info">{/* <BasicTabs /> */}</div>
                </div>
            </section>
        </LayoutApp>
    );
};

export default SingleProduct;
