import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopUp, setBillPopUp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.rootReducer);

  const handlerIncrement = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const handlerDecrement = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  const handlerDelete = (record) => {
    dispatch({
      type: "DELETE_FROM_CART",
      payload: record,
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <MinusCircleOutlined
            className="cart-minus"
            onClick={() => handlerDecrement(record)}
          />
          <strong className="cart-quantity">{record.quantity}</strong>
          <PlusCircleOutlined
            className="cart-plus"
            onClick={() => handlerIncrement(record)}
          />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          className="cart-action"
          onClick={() => handlerDelete(record)}
        />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItems.forEach(
      (product) => (temp = temp + product.price * product.quantity)
    );
    setSubTotal(temp);
  }, [cartItems]);

  const handlerSubmit = async (value) => {
    try {
      const cus = {
        name: value.name,
        phone: value.phone,
        city: value.city,
        sector: value.sector,
        branch_id: "63ff70cc24e35b6afc14c50f",
        address: value.address,
      };
      const res = await axios.post("/api/v1/customer", cus);

      if (res.data._id) {
        const newObject = {
          branch_id: "63ff70cc24e35b6afc14c50f",
          customer_id: res.data._id,
          status: "pending",
          amount: subTotal,
          payment_status: "pending",
        };
        const { data } = await axios.post("/api/v1/sales-order", newObject);
        console.log("Sales order created successfully:", data);

        if (data._id) {
          for (const item of cartItems) {
            const { _id, quantity, price } = item;
            const response = await fetch("/api/v1/order-items", {
              method: "POST",
              body: JSON.stringify({
                order_id: data._id,
                product_id: _id,
                quantity,
                unit_price: price,
                branch_id: "63ff70cc24e35b6afc14c50f",
                order_option_id: "63ff61c535b307d957c2eed1",
              }),
              headers: { "Content-Type": "application/json" },
            });
            const responseData = await response.json();
            console.log("Order item created successfully:", responseData);
          }
        }
        message.success("Order Created Succesfully!");
      }
    } catch (error) {
      message.error("Error!");
      console.error(error);
    }
  };

  return (
    <Layout>
      <h2>Cart</h2>
      <Table dataSource={cartItems} columns={columns} bordered />
      <div className="subTotal">
        <h2>
          Sub Total: <span>{subTotal.toFixed(2)}PKR</span>
        </h2>
        <Button onClick={() => setBillPopUp(true)} className="add-new">
          Create Order
        </Button>
      </div>
      <Modal
        title="Create Invoice"
        visible={billPopUp}
        onCancel={() => setBillPopUp(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handlerSubmit}>
          <FormItem name="name" label="name">
            <Input />
          </FormItem>
          <FormItem name="phone" label="phone">
            <Input />
          </FormItem>
          <FormItem name="city" label="city">
            <Input />
          </FormItem>
          <FormItem name="sector" label="sector">
            <Input />
          </FormItem>
          <FormItem name="address" label="address">
            <Input />
          </FormItem>

          <div className="total">
            <h3>
              Total:
              {subTotal.toFixed(2)}PKR
            </h3>
            <br />
            {/* <span>Tax: ${((subTotal / 100) * 10).toFixed(2)}</span>
            <h3>
              Total: $
              {(
                Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
              ).toFixed(2)}
            </h3> */}
          </div>
          <div className="form-btn-add">
            <Button htmlType="submit" className="add-new">
              Generate Order
            </Button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Cart;
