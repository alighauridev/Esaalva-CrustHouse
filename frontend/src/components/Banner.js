import React from "react";
import "../scss/style.css";
const Banner = () => {
    return (
        <div class="banner" id="banner">
            <div class="container">
                <div className="banner-content">
                    <h1>E-SALWA - Order Food and Reserve Tables with Ease</h1>
                    <p>With E-SALWA, you can enjoy delicious food without any stress or inconvenience. So why wait? Order now and taste the convenience!</p>
                    <a href="#menu">
                        <button>Browse Our Menu</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Banner;
