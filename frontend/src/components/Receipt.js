import {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
const Receipt = ({ basicModal, setBasicModal, toggleShow, orderItem }) => {
    const user = useSelector((state) => state.User.userInfo);
    const navigate = useNavigate();

    return (
        <>
            {
                basicModal && <section className="" style={{ backgroundColor: "#35558a" }}>
                    <MDBContainer className="py-5 h-100">
                        <MDBRow className="justify-content-center align-items-center h-100 text-center">
                            <MDBCol>

                                <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                                    <MDBModalDialog>
                                        <MDBModalContent>
                                            <MDBModalHeader className="border-bottom-0">
                                                <MDBBtn
                                                    className="btn-close"
                                                    color="none"
                                                    onClick={() => setBasicModal(false)}
                                                ></MDBBtn>
                                            </MDBModalHeader>
                                            <MDBModalBody className="text-start text-black p-4">
                                                <MDBTypography
                                                    tag="h5"
                                                    className="modal-title text-uppercase mb-5"
                                                    id="exampleModalLabel"
                                                >
                                                    {user.name}
                                                </MDBTypography>
                                                <MDBTypography
                                                    tag="h4"
                                                    className="mb-5"
                                                    style={{ color: "#35558a" }}
                                                >
                                                    Thanks for your order
                                                </MDBTypography>
                                                <p className="mb-0" style={{ color: "#35558a" }}>
                                                    Payment summary
                                                </p>
                                                <hr
                                                    className="mt-2 mb-4"
                                                    style={{
                                                        height: "0",
                                                        backgroundColor: "transparent",
                                                        opacity: ".75",
                                                        borderTop: "2px dashed #9e9e9e",
                                                    }}
                                                />

                                                <div className="d-flex justify-content-between">
                                                    <p className="fw-bold mb-0">Ether Chair(Qty:{orderItem.items.length})</p>
                                                    <p className="text-muted mb-0">{orderItem.totalPrice}</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="small mb-0">Shipping</p>
                                                    <p className="small mb-0">00.00</p>
                                                </div>

                                                <div className="d-flex justify-content-between pb-1">
                                                    <p className="small">Tax</p>
                                                    <p className="small">00.00</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="fw-bold">Total</p>
                                                    <p className="fw-bold" style={{ color: "#35558a" }}>
                                                        {orderItem.totalPrice}
                                                    </p>
                                                </div>
                                            </MDBModalBody>

                                            <MDBModalFooter className="d-flex justify-content-center border-top-0 py-4">
                                                <MDBBtn
                                                    size="lg"
                                                    style={{ backgroundColor: "#35558a" }}
                                                    className="mb-1"
                                                    onClick={() => navigate('/jazzcash')}
                                                >
                                                    Pay By Credit Card
                                                </MDBBtn>
                                                <MDBBtn
                                                    size="lg"
                                                    style={{ backgroundColor: "#35558a" }}
                                                    className="mb-1"
                                                >
                                                    Pay Cash
                                                </MDBBtn>
                                            </MDBModalFooter>
                                        </MDBModalContent>
                                    </MDBModalDialog>
                                </MDBModal>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            }

        </>
    )
}

export default Receipt
