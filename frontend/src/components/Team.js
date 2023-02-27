import React from "react";
import "../scss/team.scss"
const Team = () => {
    return (
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
                                    src="https://tanvir1717.github.io/restaurant/assets/img/chef/chef.jpg"
                                    className="card-img-top rounded-pill mx-auto px-2 mt-3"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-black text-center fs-4 mt-3 text-uppercase">
                                        John Lady
                                    </h5>
                                    <p className="text-dark-yellow fs-6 py-2 text-uppercase">
                                        co-founder
                                    </p>
                                    <p className="card-text text-black text-center">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                        Quibusdam assumenda possimus dolor deleniti. Repudiandae
                                        veritatis ipsum modi maiores, facilis sed.
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
                                    src="https://tanvir1717.github.io/restaurant/assets/img/chef/chef2.jpg"
                                    className="card-img-top rounded-pill mx-auto px-2 mt-3"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-black text-center fs-4 mt-3 text-uppercase">
                                        John smith
                                    </h5>
                                    <p className="text-dark-yellow fs-6 py-2 text-uppercase">
                                        co-founder
                                    </p>
                                    <p className="card-text text-black text-center">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                        Quibusdam assumenda possimus dolor deleniti. Repudiandae
                                        veritatis ipsum modi maiores, facilis sed.
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
                                    src="https://tanvir1717.github.io/restaurant/assets/img/chef/chef3.jpg"
                                    className="card-img-top rounded-pill mx-auto px-2 mt-3"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-black text-center fs-4 mt-3 text-uppercase">
                                        Jenny ma
                                    </h5>
                                    <p className="text-dark-yellow fs-6 py-2 text-uppercase">
                                        co-founder
                                    </p>
                                    <p className="card-text text-black text-center">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                        Quibusdam assumenda possimus dolor deleniti. Repudiandae
                                        veritatis ipsum modi maiores, facilis sed.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team;
