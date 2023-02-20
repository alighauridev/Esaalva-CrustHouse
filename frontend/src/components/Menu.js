import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import "../scss/menu.scss";
import axios from "axios";
import { data } from "../assets/data";
const Menu = () => {
    const [productData, setProductData] = useState([]);
    const [filterData, setfilterData] = useState([]);
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/menu");
            console.log(data);
            setProductData(data);
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
                    {data.map((item, index) => {
                        return <MenuItem id={index} item={item} />;
                    })}
                </div>
            </div>
        </section>
    );
};

export default Menu;
