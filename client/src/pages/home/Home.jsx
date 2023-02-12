import React, { useState, useEffect } from "react";
import axios from "axios";
import LayoutApp from "../../components/Layout";
import { Row, Col } from "antd";
import Product from "../../components/Product";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Burgers");
  const [selectedBranch, setSelectedBranch] = useState("Lahore");

  const categories = [
    {
      name: "Pizza",
      imageUrl:
        "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/27954/pizza-pepperoni-clipart-xl.png",
    },
    {
      name: "Burgers",
      imageUrl:
        "https://cdn.pixabay.com/photo/2022/01/04/23/00/fast-food-6916101_960_720.png",
    },
    {
      name: "Pasta",
      imageUrl:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    },
    {
      name: "Salads",
      imageUrl:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    },

    {
      name: "Entrees",
      imageUrl:
        "https://images.vexels.com/media/users/3/246333/isolated/preview/9626dce3278f72220ea2736de64e6233-pink-cocktail-color-stroke.png",
    },
  ];
  const branches = ["Bhakkar", "Lahore", "Islamabad"];

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/v1/products");
        setProductData(data);
        dispatch({
          type: "HIDE_LOADING",
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, [dispatch]);

  return (
    <LayoutApp>
      <div className="category">
        {branches.map((branch, i) => (
          <div
            key={i}
            className={`categoryFlex ${
              selectedBranch === branch && "category-active"
            }`}
            onClick={() => setSelectedBranch(branch)}
          >
            <h3 className="categoryName">{branch}</h3>
            {/* <img
              src={category.imageUrl}
              alt={category.name}
              height={60}
              width={60}
            /> */}
          </div>
        ))}
      </div>
      <Row>
        {productData
          .filter((i) => i.branch === selectedBranch)
          .map((product) => {
            return (
              <Col xs={24} sm={6} md={12} lg={6}>
                <Product key={product._id} product={product} />
              </Col>
            );
          })}
      </Row>
    </LayoutApp>
  );
};

export default Home;
