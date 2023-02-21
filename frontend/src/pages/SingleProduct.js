import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../scss/product.scss";
import "../components/Main/Main.css";
import MainLeft from "../components/MainLeft/MainLeft";
import MainRight from "../components/MainRight/MainRight";
import { data } from "../assets/data";
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
                const { data } = await axios.get(`/api/v1/menu-item/${id}`);
                setProductData(data);

                console.log(productData);
            } catch (error) {
                console.log(error);
            }

        };

        getAllProducts();
    }, [dispatch, navigate, id]);
    //     _id: "123456789012345678901234",
    //         name: "Beverages",
    //             image: "https://images.unsplash.com/photo-1496318447583-f524534e9ce1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8QmV2ZXJhZ2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    //                 __v: 0
    // },
    //     products: [
    //         {
    //             _id: "123456789012345678901236",
    //             name: "Iced Coffee",
    //             price: 3.99,
    //             category: "Beverages",
    //             description: "Refreshing iced coffee with cream and sugar",
    //             image: "https://example.com/icedcoffee.jpg",
    //             __v: 0
    //         },
    return (
        <>
            <section className="prod__info">
                <div className="container">
                    <div className="grid">
                        <div className="item">
                            <div className="gallery">
                                <div className="img">
                                    <img
                                        src={
                                            productData.image
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="top__detail">
                                <div className="title">
                                    <h2 className="category">{productData.type}</h2>
                                    <h2 className="title__name">{productData.name}</h2>
                                </div>
                                <div
                                    className="description"
                                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                                >
                                    {productData.description}
                                </div>
                                <div className="price">
                                    <h2>${productData.price}</h2>
                                </div>

                                <div className="rating"> </div>
                            </div>
                            {/* <h3>Related Items:</h3>
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
                            </div> */}
                        </div>
                    </div>
                    <div className="tabs__info">{/* <BasicTabs /> */}</div>
                </div>
            </section>
            {/* <main className="main">
                <div className="hold">
                    <MainLeft data={productData} />
                    <MainRight data={productData} />
                </div>
            </main> */}
        </>
    );
};

export default SingleProduct;
