import React, { useEffect, useRef, useState } from "react";

import "../scss/aboutnft.scss";

import { useNavigate } from "react-router-dom";

const AboutNft = () => {
  const [imge, setimge] = useState("/images/characters/group.png");



  const navigate = useNavigate();
  return (
    <>
      <section id="about" className="about">
        <div className="container">
          <div className="about__grid">

            <div className="item">
              <div>
                <h2>Your one-stop-shop for food ordering and table reservation</h2>
              </div>
              <p>

                <span>
                  Are you tired of waiting in long lines or dealing with incorrect orders? E-SALWA has got you covered. Our web-based product and mobile applications make it easy for you to order food and reserve tables with just a few clicks. Our multilingual support ensures that you can view menus and deals in your preferred language, making the ordering process even more convenient.


                </span>
                <span>
                  E-SALWA is your ultimate solution for food ordering and table reservation needs. Our web-based product is accessible via URL or Android® or IOS® Applications, giving you the convenience of ordering food from any restaurant, food point, or fast food chain. With multilingual support, you can easily view menus and deals in your preferred language and even listen to menus in the language of your choice.
                </span>
              </p>
              <button onClick={() => navigate("/story")}>Our Menu</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutNft;
