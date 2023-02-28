import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../scss/product.scss";
import "../components/Main/Main.css";
import MainLeft from "../components/MainLeft/MainLeft";
import MainRight from "../components/MainRight/MainRight";
import { data } from "../assets/data";
import getDistance from "geolib/es/getDistance";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Header from "../components/Header";
import { addToCart } from "../Redux/actions/cartActions";
const SingleProduct = () => {
    const dispatch = useDispatch();
    const [qi, setQi] = useState([]);
    const [productData, setProductData] = useState({
        image: "",
        price: 0,
        name: "",
    });
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [age, setAge] = React.useState(1);
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const { id } = useParams();
    const navigate = useNavigate();
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`/api/v1/menu-item/${id}`);
            setProductData(data.menuItem);
            setRelatedProducts(data.uniqueItems);
            setQi(data.menuItem.foodPoint.gpsCoordinates);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllProducts();
    }, [id]);

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return `${d.toFixed(2)}km`;
    }
    const addToCartHandler = (item) => {
        dispatch(addToCart(item._id, age));
    };
    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    const coord1 = ["31.5204° N", "74.3587° E"];
    const lat1 = parseFloat(qi[0]);
    const lon1 = parseFloat(qi[1]);

    const coord2 = ["28.7041° N", "77.1025° E"];
    const lat2 = parseFloat(coord2[0]);
    const lon2 = parseFloat(coord2[1]);

    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    console.log(calculateDistance(lat1, lon1, lat2, lon2)); // Output: 452.77 km

    return (
        <>
            <Header />
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

                                    <div className="qty">
                                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                            <InputLabel
                                                id="demo-select-small"
                                                style={{ color: "#fff" }}
                                            >
                                                Quantity
                                            </InputLabel>
                                            <Select
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                value={age}
                                                label="Age"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <button onClick={() => {
                                    addToCartHandler(productData);
                                    navigate('/cart')
                                }}>Add to Cart!</button>
                                <div className="rating"> </div>
                            </div>
                            <h3
                                style={{
                                    fontWeight: "200",
                                    fontSize: "2rem",
                                    color: "rgb(254, 64, 56)",
                                    fontFamily: "'Merienda'",
                                    fontSize: "22px",
                                }}
                            >
                                Related Items:
                            </h3>
                            <div className="quantity">
                                <div className="qty">
                                    {relatedProducts?.map((item, index) => {
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
                                                        <div className="end">
                                                            {" "}
                                                            {calculateDistance(
                                                                parseFloat(qi[0]),
                                                                parseFloat(qi[1]),
                                                                parseFloat(item.foodPoint.gpsCoordinates[0]),
                                                                parseFloat(item.foodPoint.gpsCoordinates[1])
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="bottom">
                                                        <div className="start">${item.price}</div>
                                                        <div className="end"> {item.foodPoint?.name}</div>
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
