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
      const newObject = {
        ...value,
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
            }),
            headers: { "Content-Type": "application/json" },
          });
          const responseData = await response.json();
          console.log("Order item created successfully:", responseData);
        }
      }
      message.success("Bill Generated!");
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
          Sub Total: <span>$ {subTotal.toFixed(2)}</span>
        </h2>
        <Button onClick={() => setBillPopUp(true)} className="add-new">
          Create Invoice
        </Button>
      </div>
      <Modal
        title="Create Invoice"
        visible={billPopUp}
        onCancel={() => setBillPopUp(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handlerSubmit}>
          <FormItem name="branch_id" label="branch id">
            <Input />
          </FormItem>
          <FormItem name="customer_id" label="Customer id">
            <Input />
          </FormItem>
          {/* <FormItem name="customerAddress" label="Customer Address">
            <Input />
          </FormItem> */}

          <div className="total">
            <span>SubTotal: ${subTotal.toFixed(2)}</span>
            <br />
            <span>Tax: ${((subTotal / 100) * 10).toFixed(2)}</span>
            <h3>
              Total: $
              {(
                Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
              ).toFixed(2)}
            </h3>
          </div>
          <div className="form-btn-add">
            <Button htmlType="submit" className="add-new">
              Generate Invoice
            </Button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Cart;
