import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import "../scss/menu.scss";
import axios from "axios";
import { data } from "../assets/data";
const Menu = () => {
    const [productData, setProductData] = useState([]);
    const [filterData, setfilterData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [menuType, setMenuType] = useState([]);
    const [menu, setMenu] = useState();
    const [pointName, setPointName] = useState("");
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(
                "/api/v1/foodpoints/63f67ded55977415944ab380"
            );
            setPointName(data.name);
            setProductData(data.filterProducts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <section className="menu" id="menu">
            <div className="heading">
                <h1>{pointName} MENU</h1>
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
