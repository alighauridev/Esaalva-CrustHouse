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
                <h2>SOMETIMES, A SMALLER SCALE RAMEN SHOP JUST WORKS.</h2>
              </div>
              <p>

                <span>
                  In Japan due to its limited space, it's not unusual to find small shops like ours serve the finest ramen. What sets Tokio Ramen apart is the attention to detail in the art of ramen creation, and the fact that ramen is the centerpiece of our offerings. It is customary to taste the broth before enjoying the rest of the bowl to know that you have exquisite quality before you. And be sure to slurp away; we won't judge. Slurping is customary in Japan and is known to actually enhance the flavor that much more.


                </span>
                <span>
                  And about that "ramen" you've been raving about to your friends from that fusion place... yeah, you can forget about that after experiencing ours. We can post all we want about how glorious our ramen is, but you won't know until you come by and judge for yourself
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
