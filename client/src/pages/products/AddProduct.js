import React from 'react'
import LayoutApp from "../../components/Layout";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table, message } from "antd";
import FormItem from "antd/lib/form/FormItem";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from 'react-redux';
import axios from 'axios';
const AddProduct = ({ editProduct, setPopModal }) => {
    const dispatch = useDispatch()
    const handlerSubmit = async (value) => {
        //console.log(value);
        if (editProduct === null) {
            try {
                dispatch({
                    type: "SHOW_LOADING",
                });
                const res = await axios.post("/api/products/addproducts", value);
                message.success("Product Added Successfully!");
                setPopModal(false);
                dispatch({
                    type: "HIDE_LOADING",
                });
            } catch (error) {
                dispatch({
                    type: "HIDE_LOADING",
                });
                message.error("Error!");
                console.log(error);
            }
        } else {
            try {
                dispatch({
                    type: "SHOW_LOADING",
                });
                await axios.put("/api/products/updateproducts", {
                    ...value,
                    productId: editProduct._id,
                });
                message.success("Product Updated Successfully!");
                setPopModal(false);
                dispatch({
                    type: "HIDE_LOADING",
                });
            } catch (error) {
                dispatch({
                    type: "HIDE_LOADING",
                });
                message.error("Error!");
                console.log(error);
            }
        }
    };
    return (
        <>
            <Form
                layout="vertical"
                initialValues={editProduct}
                onFinish={handlerSubmit}
            >
                <FormItem name="name" label="Name">
                    <Input />
                </FormItem>
                <Form.Item name="category" label="Category">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={''}
                        label="Category"
                        style={{
                            width: "100%",
                            height: "36px",
                            fontSize: "14px",
                            border: "1px solid #d9d9d90a",
                        }}
                    >
                        <MenuItem value={"Pasta"}>Pasta</MenuItem>
                        <MenuItem value={"Burgers"}>Burgers</MenuItem>
                        <MenuItem value={"Entrees"}>Entrees</MenuItem>
                        <MenuItem value={"Salads"}>Salads</MenuItem>
                    </Select>
                </Form.Item>
                <Form.Item name="Branches" label="Branches">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={''}
                        label="Category"
                        style={{
                            width: "100%",
                            height: "36px",
                            fontSize: "14px",
                            border: "1px solid #d9d9d90a",
                        }}
                    >
                        <MenuItem value={"Lahore"}>Lahore</MenuItem>
                        <MenuItem value={"Bhakkar"}>Bhakkar</MenuItem>
                        <MenuItem value={"Islamabad"}>Islamabad</MenuItem>
                    </Select>
                </Form.Item>
                <FormItem name="price" label="Price">
                    <Input type="number" />
                </FormItem>
                <FormItem name="Stock" label="Stock">
                    <Input type="number" />
                </FormItem>
                <div className="form-btn-add">
                    <Button htmlType="submit" className="add-new">
                        Add
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default AddProduct