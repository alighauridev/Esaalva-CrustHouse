import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import "../scss/menu.scss";
import axios from "axios";
import { data } from "../assets/data";
const Menu = () => {
    const [productData, setProductData] = useState([]);
    const [filterData, setfilterData] = useState([]);
    const [categories, setCategories] = useState([])
    const [menuType, setMenuType] = useState([])
    const [menu, setMenu] = useState();
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/foodpoints/63f4d70e88b6eaa37ff01664");
            console.log(data);
            setProductData(data.filterProducts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <section className="menu">
            <div className="heading">
                <h1>OUR MENU</h1>
            </div>
            <div className="container">
                <div className="grid">
                    {productData.map((item, index) => {
                        return <MenuItem id={index} item={item} />;
                    })}
                </div>
            </div>
        </section>
    );
};

export default Menu;
