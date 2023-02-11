import React, { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import LayoutApp from "../../components/Layout";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table, message } from "antd";
import FormItem from "antd/lib/form/FormItem";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Products = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [category, setCategory] = useState("Category");
  const [branch, setBranch] = useState("Branch");
  const getAllProducts = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/v1/products");
      console.log(data);
      setProductData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handlerDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("/api/products/deleteproducts", {
        productId: record._id,
      });
      message.success("Product Deleted Successfully!");
      getAllProducts();
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
  };

  const handleChange = async (event, type) => {
    const types = ["Category", "Branch"];
    if (type === "Branch") {
      setBranch(event.target.value);
      const { data } = await axios.get(
        `/api/v1/products/branch/${event.target.value}`
      );
      setProductData(data);
      setCategory("");
    }
    if (type === "Category") {
      setCategory(event.target.value);
      const { data } = await axios.get(
        `/api/v1/products/category/${event.target.value}`
      );
      setProductData(data);
      setBranch("");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    // {
    //   title: "Action",
    //   dataIndex: "_id",
    //   render: (id, record) => (
    //     <div>
    //       <DeleteOutlined
    //         className="cart-action"
    //         onClick={() => handlerDelete(record)}
    //       />
    //       <EditOutlined
    //         className="cart-edit"
    //         onClick={() => {
    //           setEditProduct(record);
    //           setPopModal(true);
    //         }}
    //       />
    //     </div>
    //   ),
    // },
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   render: (image, record) => (
    //     <img src={image} alt={record.name} height={60} width={60} />
    //   ),
    // },
    {
      title: "Branches",
      dataIndex: "branch",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
  ];

  const handlerSubmit = async (value) => {
    //console.log(value);
    if (editProduct === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post("/api/products/addproducts", value);
        message.success("Product Added Successfully!");
        getAllProducts();
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
        getAllProducts();
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
    <LayoutApp>
      <h2>All Products </h2>
      <div
        className="flex"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridGap: "2rem",
        }}
      >
        {" "}
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(e) => handleChange(e, "Category")}
            >
              <MenuItem value={"Pasta"}>Pasta</MenuItem>
              <MenuItem value={"Burgers"}>Burgers</MenuItem>
              <MenuItem value={"Entrees"}>Entrees</MenuItem>
              <MenuItem value={"Salads"}>Salads</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Branch</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={branch}
              label="Branch"
              onChange={(e) => handleChange(e, "Branch")}
            >
              <MenuItem value={"Bhakkar"}>Bhakkar</MenuItem>
              <MenuItem value={"Lahore"}>Lahore</MenuItem>
              <MenuItem value={"Islamabad"}>Islamabad</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <Button className="add-new" onClick={() => setPopModal(true)}>
        Add New
      </Button>
      <Table dataSource={productData} columns={columns} bordered />
      {popModal && (
        <Modal
          title={`${editProduct !== null ? "Edit Product" : "Add New Product"}`}
          visible={popModal}
          onCancel={() => {
            setEditProduct(null);
            setPopModal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editProduct}
            onFinish={handlerSubmit}
          >
            <FormItem name="name" label="Name">
              <Input />
            </FormItem>
            <Form.Item name="category" label="Category">
              {/* <Select>
                <Select.Option value="pizzas">Pizzas</Select.Option>
                <Select.Option value="burgers">Burgers</Select.Option>
                <Select.Option value="drinks">Drinks</Select.Option>
              </Select> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                style={{
                  width: "100%",
                  height: "36px",
                  fontSize: "14px",
                  border: "1px solid #d9d9d90a",
                }}
                onChange={(e) => handleChange(e, "Category")}
              >
                <MenuItem value={"Pasta"}>Pasta</MenuItem>
                <MenuItem value={"Burgers"}>Burgers</MenuItem>
                <MenuItem value={"Entrees"}>Entrees</MenuItem>
                <MenuItem value={"Salads"}>Salads</MenuItem>
              </Select>
            </Form.Item>
            <FormItem name="price" label="Price">
              <Input />
            </FormItem>
            <FormItem name="image" label="Image URL">
              <Input />
            </FormItem>
            <div className="form-btn-add">
              <Button htmlType="submit" className="add-new">
                Add
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </LayoutApp>
  );
};

export default Products;
