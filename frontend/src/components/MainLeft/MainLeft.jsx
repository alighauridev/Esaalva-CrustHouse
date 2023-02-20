import React from "react";
import Previewer from "../Previewer/Previewer";
import "./MainLeft.css";

export default function MainLeft({ data }) {
  return (
    <div className="mainLeft">
      <Previewer image={data.image} />
    </div>
  );
}
