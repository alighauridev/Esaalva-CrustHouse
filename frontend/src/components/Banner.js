import React from "react";
import "../scss/style.css";
import Header from "./Header";
const Banner = () => {
    return (
        <div class="banner" id="banner">
            <Header />
            <div class="container">
                <div className="banner-content">
                    <h1>E-SALWA - Order Food and Reserve Tables with Ease</h1>
                    <p>With E-SALWA, you can enjoy delicious food without any stress or inconvenience. So why wait? Order now with convenience!</p>
                    <div className="flex" >               <a href="#menu">
                        <button>Explore Our Menu</button>
                    </a>
                        <a href="#menu">
                            <button>Browse Our Menu</button>
                        </a></div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
