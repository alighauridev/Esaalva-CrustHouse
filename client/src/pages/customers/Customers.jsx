import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";

const Customers = () => {
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);

  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/v1/customer");
      setBillsData(data);
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
    getAllBills();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: "name",
    },
    {
      title: "Contact Number",
      dataIndex: "phone",
    },
    {
      title: "Customer Address",
      dataIndex: "address",
    },
  ];

  return (
    <Layout>
      <h2>All Customers </h2>
      <Table dataSource={billsData} columns={columns} bordered />
    </Layout>
  );
};

export default Customers;
