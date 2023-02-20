import React from "react";

import "./Main.css";
import MainLeft from "../MainLeft/MainLeft";
import MainRight from "../MainRight/MainRight";
export default function Main() {
  return (
    <main className="main">
      <div className="hold">
        <MainLeft />
        <MainRight />
      </div>
    </main>
  );
}
