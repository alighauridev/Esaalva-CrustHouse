import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
    MDBBadge,
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { addToCart, removeCart } from "../Redux/actions/cartActions";
import CustomerForm from "../components/CustomerForm";
import axios from "axios";
import Receipt from "../components/Receipt";
import moment from 'moment';
import "../scss/order.scss"
export default function Order() {
    const cartProducts = useSelector((state) => state.Cart.cartItems);
    const user = useSelector((state) => state.User);
    const [type, setType] = useState("dining");
    const [people, setPeople] = useState(0);
    const [orderItem, setOrderItem] = useState()
    const [open, setOpen] = useState();
    const [basicModal, setBasicModal] = useState(false);
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setType(event.target.value);
    };
    const total = cartProducts
        .reduce((a, i) => a + i.qty * i.price, 0)
        .toFixed(2);

    const deleteCart = (id) => {
        dispatch(removeCart(id));
    };
    const toggleShow = () => setBasicModal(!basicModal);
    const submitHandler = async (e) => {
        e.preventDefault();

        if (user.userInfo) {
            const { data } = await axios.post("/api/v1/order", {
                user: user.userInfo._id,
                foodPoint: user.userInfo.foodPoint,
                items: cartProducts.map((ite, ind) => {
                    return {
                        item: ite.product,
                        quantity: ite.qty,
                        price: ite.price,
                    };
                }),
                expectedNumberOfGuests: people,
                tableType: type,
                status: "Pending",
                totalPrice: total,
            });

            if (data) {
                toast.success("Profile has updated!");
            }
        } else {
            setOpen(true);
        }
    };
    useEffect(() => {
        const getOrders = async () => {
            if (user.userInfo._id) {
                const { data } = await axios.get(`/api/v1/order/${user.userInfo._id}`);
                console.log(data);
                if (data) {
                    setOrders(data);
                    console.log(orders);
                }
            }
        };
        getOrders();
    }, []);

    const statusColors = (status) => {
        if (status === 'Pending') {
            return "warning"
        }
        if (status === 'Completed') {
            return "Success"
        }
    }
    return (
        <>
            <Header bg={"#fff"} />
            <CustomerForm open={open} setOpen={setOpen} />
            <section
                className="vh-90 h-custom order__table"
                style={{ backgroundColor: "#eee" }}
            >
                <MDBContainer className="py-5 h-100">
                    {user.userInfo.name && <h2>{user.userInfo.name} Your Orders</h2>}
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBTable align="middle">
                            <MDBTableHead>
                                <tr className="order__th">
                                    <th scope="col">Order Time</th>
                                    <th scope="col">Total Items</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Order Price</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {!orders.length > 0 ? (
                                    <h1 style={{ marginTop: '100px', color: "black", textAlign: 'center' }}>No Orders Record Found</h1>
                                ) : (
                                    orders.map((item, index) => {
                                        return (
                                            <tr className="order__td" onClick={() => setOrderItem(item)}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="ms-3">

                                                            <p className="text-muted mb-0">
                                                                {moment(item.orderTime).fromNow()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="fw-normal mb-1">{item.items.length}</p>

                                                </td>
                                                <td>
                                                    <MDBBadge color={statusColors(item.status)} pill>
                                                        {item.status}
                                                    </MDBBadge>
                                                </td>
                                                <td>{item.totalPrice}</td>
                                                <td>
                                                    <MDBBtn
                                                        color="link"
                                                        onClick={toggleShow}
                                                        rounded
                                                        size="sm"
                                                    >
                                                        Track Your Order
                                                    </MDBBtn>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </MDBTableBody>
                        </MDBTable>
                    </MDBRow>
                </MDBContainer>
            </section>
            <Receipt
                toggleShow={toggleShow}
                basicModal={basicModal}
                setBasicModal={setBasicModal}
                orderItem={orderItem}
            />
        </>
    );
}
