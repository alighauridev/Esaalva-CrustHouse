import React from "react";
import "../scss/team.scss";
import img from "../assets/OE612O0.jpg";
import Header from "./Header";
const Team = () => {
    return (
        <>
            <Header bg={"#fff"} />
            <div className="chef bg-grey">
                <h1
                    className="text-font fs-1  text-capitalize text-dark-yellow text-center mt-5 aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-delay="50"
                    data-aos-easing="ease-in-out"
                >
                    awesome chefs
                </h1>
                <div className="chef-content">
                    <div className=" mb-4">
                        <div className="row">
                            <div className="col-md-4">
                                <div
                                    className="card text-center mt-3 aos-init aos-animate"
                                    data-aos="fade-right"
                                    data-aos-delay="100"
                                    data-aos-easing="ease-in-out"
                                >
                                    <img
                                        src={img}
                                        className="card-img-top rounded-pill mx-auto px-2 mt-3"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-black text-center fs-4 mt-3 text-uppercase">
                                            Chef Zakir Qureshi
                                        </h5>
                                        <p className="text-dark-yellow fs-6 py-2 text-uppercase">
                                            Head Chef/Consultant
                                        </p>
                                        <p className="card-text text-black text-center">
                                            Chef Zakir is a well-known Pakistani chef who has been
                                            hosting cooking shows on television for several years. He is
                                            known for his expertise in Pakistani cuisine and has
                                            published several cookbooks.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div
                                    className="card text-center mt-3 aos-init aos-animate"
                                    data-aos="zoom-out"
                                    data-aos-delay="200"
                                    data-aos-easing="ease-in-out"
                                >
                                    <img
                                        src={img}
                                        className="card-img-top rounded-pill mx-auto px-2 mt-3"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-black text-center fs-4 mt-3 text-uppercase">
                                            Chef Anwar
                                        </h5>
                                        <p className="text-dark-yellow fs-6 py-2 text-uppercase">
                                            Culinary Director
                                        </p>
                                        <p className="card-text text-black text-center">
                                            Chef Anwar is another famous Pakistani chef who has been
                                            hosting cooking shows for over two decades. She is known for
                                            her traditional Pakistani recipes and has won several awards
                                            for her contribution to the culinary world.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div
                                    className="card text-center mt-3 aos-init aos-animate"
                                    data-aos="fade-left"
                                    data-aos-delay="100"
                                    data-aos-easing="ease-in-out"
                                >
                                    <img
                                        src={img}
                                        className="card-img-top rounded-pill mx-auto px-2 mt-3"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-black text-center fs-4 mt-3 text-uppercase">
                                            Chef Gulzar
                                        </h5>
                                        <p className="text-dark-yellow fs-6 py-2 text-uppercase">
                                            Executive Chef/Menu Planner
                                        </p>
                                        <p className="card-text text-black text-center">
                                            Chef Gulzar is a renowned Pakistani chef who has worked in
                                            several leading hotels and restaurants across Pakistan. He
                                            is known for his unique blend of Pakistani and Continental
                                            cuisine and has published several cookbooks.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Team;
