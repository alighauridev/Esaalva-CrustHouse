import React from 'react'
import "../scss/footer.scss"
const Footer = () => {
    return (
        <footer>
            <div class="footer bg-bluish">
                <div class="footer-content aos-init aos-animate" data-aos="fade-up" data-aos-delay="50" data-aos-easing="ease-in-out">
                    <div class="container">
                        <div class="row my-4">
                            <div class="col-lg-3">
                                <p class="fs-4 text-font text-dark-yellow my-3">LaFista</p>
                                <p class="text-white">Lorem, ipsum-31</p>
                                <p class="text-white">Lorem, ipsum,00000</p>
                                <p class="text-white mt-3">p: +2342736</p>
                                <p class="text-white">email@email.com</p>
                            </div>
                            <div class="col-lg-3">
                                <p class="fs-4 text-white my-3">Reservation</p>
                                <p class="text-white">book@email.com</p>
                                <p class="text-white mt-3">p: +2342736</p>
                                <p class="my-3 text-white fs-4">Private Dining</p>
                                <p class="text-white">private@email.com</p>
                                <p class="text-white mt-3">p: +2342736</p>
                            </div>
                            <div class="col-lg-3">
                                <p class="fs-4 text-white my-3">Hours</p>
                                <p class="text-white">Monday-Sunday</p>
                                <p class="text-white">Launch 12pm-2pm</p>
                                <p class="text-white">Dinner 6pm-10pm</p>
                                <p class="text-white mt-3">Happy Hoours 7pm-10pm</p>
                            </div>
                            <div class="col-lg-3">
                                <p>
                                </p><p href="javascript:void(0)" class="text-capitalize text-white"><i class="bi bi-telephone-plus-fill me-3 fs-5 text-dark-yellow"></i>(111) 123 4567</p>
                                <p href="javascript:void(0)" class="text-capitalize text-white"><i class="bi bi-envelope-check-fill me-3 fs-5 text-dark-yellow"></i>Yourmail@email.com</p>
                                <p href="javascript:void(0)" class="text-capitalize text-white"><i class="bi bi-house-door-fill me-3 fs-5 text-dark-yellow"></i>1234 N Harbar Dr.san dieago</p>
                                <a href="javascript:avoid(0)"><i class="bi bi-facebook text-dark-yellow fs-5 me-2"></i></a>
                                <a href="javascript:avoid(0)"><i class="bi bi-twitter text-dark-yellow fs-5 px-2"></i></a>
                                <a href="javascript:avoid(0)"><i class="bi bi-instagram text-dark-yellow fs-5 px-2"></i></a>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-dark footer__bottom w-100 text-center">
                <p class="text-white text-center my-4">Copyright © 2022.All rights reserved <a class="text-warning" href="javascript:void(0)"> esalva</a></p>
            </div>
        </footer>
    )
}

export default Footer