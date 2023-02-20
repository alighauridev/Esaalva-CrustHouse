import React, { useContext } from "react";
import Btn from "../Btn/Btn";
import "./Previewer.css";

export default function Previewer({ modal, image }) {
  //   const appContext = useContext(AppContext);
  const img = "";
  return (
    <div className={`previewer ${modal ? null : "previewerHome"}`}>
      <Btn
        className={"previewerClose"}
        icon={img.iconClose}
        // onClick={fClosePreviewerModal}
      />

      <div className="previewerMain">
        <Btn
          className={"previewerBtn"}
          icon={img.iconPrevious}
          //   onClick={fPrevious}
        />
        <img className="previewerImg" src={image} alt="" />
        <Btn className={"previewerBtn"} icon={img.iconNext} onClick={""} />
      </div>

      <div className="previewerPlaylist">
        {/* {appContext?.data?.map((item, index) => (
          <div
            className={`previewerItem ${
              appContext?.currentIndex === index
                ? "previewerItemSelected"
                : null
            }`}
            onClick={() => fPreviewerItemClicked(index)}
            key={index}
          >
            <img src={item.img} alt="" />
          </div>
        ))} */}
      </div>
    </div>
  );
}
