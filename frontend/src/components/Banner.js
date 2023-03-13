import React, { useState } from "react";
import "../scss/style.css";
import Header from "./Header";
import Loader from "./Loader";
import { Link } from "react-router-dom"
const Banner = () => {
    let [loading, setLoading] = useState(true);
    return (
        <>
            <Header />
            <div class="banner" id="banner">


                <div class="container">
                    <div className="banner-content">
                        <h1>E-SALWA - Order Food and Reserve Tables with Ease</h1>
                        <p>With E-SALWA, you can enjoy delicious food without any stress or inconvenience. So why wait? Order now with convenience!</p>
                        <div className="flex" >               <Link to={"/about"}>
                            <button>Read More</button>
                        </Link>
                            <Link to={"/menu"}>
                                <button>Browse Menu</button>
                            </Link></div>
                    </div>
                </div>
                {
                    loading ? <Loader setLoading={setLoading} /> : null
                }
            </div>
        </>
    );
};

export default Banner;
