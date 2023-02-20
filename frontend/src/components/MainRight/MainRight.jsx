import React, { useContext } from "react";
import Btn from "../Btn/Btn";

import "./MainRight.css";

export default function MainRight({ data }) {
  //   const appContext = useContext(AppContext);
  const img = "";
  //   const fWantToBuy = (decrease = true) => {
  //     const wantToBuy =
  //       decrease && appContext?.wantToBuy !== 0
  //         ? appContext?.wantToBuy - 1
  //         : appContext?.wantToBuy + 1;

  //     appContext?.dispatch({
  //       type: "UPDATE_WANT_TO_BUY",
  //       payload: wantToBuy,
  //     });
  //   };

  //   const fAddToCart = () => {
  //     const data = {
  //       ...appContext?.data[0],
  //       wantToBuy: appContext?.wantToBuy,
  //     };

  //     appContext?.dispatch({
  //       type: "ADD_TO_CART",
  //       payload: data,
  //     });
  //   };

  return (
    <div className="mainRight">
      <h1 className="mainTitle">
        <span className="mainTitleSub">{data.category}</span>
        <br />
        {data.name}
      </h1>

      <p className="mainDiscribtion">{data.description}</p>

      <div className="mainPriceHold">
        <h1 className="mainPrice">
          ${data.price}
          <span className="mainDiscount">{10}%</span>
        </h1>
        <p className="mainPriceOld">${20}</p>
      </div>

      <div className="mainOpts">
        <div className="mainCount">
          <Btn
            className="mainCountBtn"
            icon={img.iconMinus}
            onClick={""}
            disabled={"appContext?.wantToBuy" === 0}
          />
          <input
            className="mainCountInput"
            type="text"
            value={"appContext?.wantToBuy"}
            readOnly
          />
          <Btn
            className="mainCountBtn"
            icon={"img.iconPlus"}
            // onClick={() => fWantToBuy(false)}
          />
        </div>

        <Btn
          className="mainAddToCart"
          icon={"img.iconCart"}
          txt="Add to cart"
          //   onClick={fAddToCart}
        />
      </div>
    </div>
  );
}
