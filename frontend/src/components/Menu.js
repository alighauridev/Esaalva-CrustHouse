import React, { useState, useEffect } from "react";
import MenuItemm from "./MenuItem";
import "../scss/menu.scss";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { data } from "../assets/data";
import Header from "./Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
const Menu = () => {
    const [productData, setProductData] = useState([]);
    const [filterData, setfilterData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [menuType, setMenuType] = useState([]);
    const [menu, setMenu] = useState();
    const [meal, setMeal] = useState("")
    const [loading, setLoading] = useState(true); // Set initial state to true
    const cartProducts = useSelector((state) => state.Cart.cartItems);
    const [pointName, setPointName] = useState("");
    const getAllProducts = async () => {
        try {
            setLoading(true)
            if (meal === "") {

                const { data } = await axios.get(
                    "/api/v1/foodpoints/63f4d70e88b6eaa37ff01664"
                );
                setPointName(data.name);
                setProductData(data.filterProducts);
                setLoading(false); // Set loading to false when data is fetched


            } else {
                try {
                    const { data } = await axios.get(
                        `/api/v1/foodpoints/63f4d70e88b6eaa37ff01664/products?mealType=${meal}`
                    );

                    setProductData(data.filterProducts);
                    setLoading(false); // Set loading to false when data is fetched
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getProductsByMeal = async () => {

    };

    useEffect(() => {
        getAllProducts();
    }, [meal]);
    useEffect(() => {
        getProductsByMeal();
    }, [meal]);


    return (
        <>
            <Header />
            <section className="menu" id="menu">

                <div className="heading" style={{ position: 'relative' }}>
                    <h1>{pointName} MENU</h1>
                    <div style={{ position: 'absolute', right: '5%', top: "10px", }}>

                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel
                                id="demo-select-small"
                                style={{ color: "#fff" }}
                            >
                                Meal
                            </InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={meal}
                                label="Age"
                                onChange={(e) => setMeal(e.target.value)}
                            >
                                <MenuItem value={"Dinner"}>Dinner</MenuItem>
                                <MenuItem value={"Lunch"}>Lunch</MenuItem>
                                <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                                <MenuItem value={""}>All</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="container">
                    <div className="grid">
                        {loading ? (
                            <>
                                {" "}
                                {[1, 2, 3, 4, 5, 6].map((item, index) => {
                                    return (
                                        <Skeleton variant="rectangular" width={"100%"} height={400} />
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                {" "}
                                {productData.map((item, index) => {
                                    return <MenuItemm id={index} item={item} />;
                                })}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Menu;
