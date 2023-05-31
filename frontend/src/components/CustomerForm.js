import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../Redux/actions/userActions";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 1,
};

const theme = createTheme();

function CustomerForm({ open, setOpen, total }) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [age, setAge] = React.useState('');
    const [name, setName] = useState("")
    const [phone, setPhone] = useState(null)


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const dispatch = useDispatch();

    const handlerSubmit = async (event) => {

        event.preventDefault();
        dispatch(register(name, phone));
        setOpen(false)

    };

    return (
        <div className="customer__modal">
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
                                    marginTop: 0,
                                    marginBottom: 4,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Typography component="h1" variant="h5">
                                    Customer Details
                                </Typography>
                                <Box
                                    component="form"
                                    noValidate
                                    onSubmit={handlerSubmit}
                                    sx={{ mt: 3 }}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="Name"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Phone"
                                                name="Phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                autoComplete="family-name"
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Table Number"
                                                name="City"
                                                type={"text"}
                                                autoComplete="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Number Of People"
                                                name="Sector"
                                                autoComplete="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={age}
                                                        label="Age"
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value={"Dinning"}>Dinning</MenuItem>
                                                        <MenuItem value={"Rooftop"}>Rooftop</MenuItem>
                                                        <MenuItem value={"Indoor"}>Indoor</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Grid> */}
                                    </Grid>
                                    <button
                                        type="submit"
                                        class="bg-blue-500 mt-4 w-[100%] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out"
                                    >
                                        Confirm Details
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
export default CustomerForm;
