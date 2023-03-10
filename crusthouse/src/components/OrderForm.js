import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    p: 1,
};


const theme = createTheme();


function OrderForm({ open, setOpen, total }) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const cartItems = useSelector(state => state.Cart.cartItems);
    const handlerSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('Name');
        const phone = data.get('Phone');
        const city = data.get('City');
        const sector = data.get('Sector');
        const address = data.get('address');

        try {
            const cus = {
                name,
                phone,
                city,
                sector,
                branch_id: "63ff70cc24e35b6afc14c50f",
                address,
            };
            const res = await axios.post("/api/v1/customer", cus);

            if (res.data._id) {
                const newObject = {
                    branch_id: "63ff70cc24e35b6afc14c50f",
                    customer_id: res.data._id,
                    status: "pending",
                    amount: total,
                    payment_status: "pending",
                };
                const { data } = await axios.post("/api/v1/sales-order", newObject);
                console.log("Sales order created successfully:", data);

                if (data._id) {
                    for (const item of cartItems) {
                        const { qty, price, option_id, product } = item;
                        const response = await fetch("/api/v1/order-items", {
                            method: "POST",
                            body: JSON.stringify({
                                order_id: data._id,
                                product_id: product,
                                quantity: qty,
                                unit_price: price,
                                branch_id: "63ff70cc24e35b6afc14c50f",
                                order_option_id: option_id,
                            }),
                            headers: { "Content-Type": "application/json" },
                        });
                        const responseData = await response.json();
                        console.log("Order item created successfully:", responseData);
                    }
                }
                toast.success("Order Created Succesfully!");
                setOpen(false)
            }
        } catch (error) {
            toast.error("Error!");
            console.error(error);
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >

                                <Typography component="h1" variant="h5">
                                    Customer Details
                                </Typography>
                                <Box component="form" noValidate onSubmit={handlerSubmit} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="Name"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="Name"
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Phone"
                                                name="Phone"
                                                autoComplete="family-name"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="City"
                                                name="City"
                                                autoComplete="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Sector"
                                                name="Sector"
                                                autoComplete="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="address"
                                                name="address"
                                                autoComplete="email"
                                            />
                                        </Grid>


                                    </Grid>
                                    <button type='submit' class="bg-blue-500 mt-4 w-[100%] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out" >
                                        Confirm Order
                                    </button>

                                </Box>
                            </Box>

                        </Container>
                    </ThemeProvider>
                </Box>
            </Modal>
        </div>
    );
}
export default OrderForm