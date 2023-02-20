import React, { useState, useEffect } from "react";
import axios from "axios";
import LayoutApp from "../../components/Layout";
import { Row, Col } from "antd";
import Product from "../../components/Product";
import { useDispatch } from "react-redux";
import salad from "../../assets/images/salaad.png";
import noodles from "../../assets/images/noodles.png";
const Home = () => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Pizza");
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
      imageUrl: noodles,
    },
    {
      name: "Salads",
      imageUrl: salad,
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
        {categories.map((cat, i) => (
          <div
            key={i}
            className={`categoryFlex ${
              selectedCategory === cat.name && "category-active"
            }`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            <h3 className="categoryName">{cat.name}</h3>
            <img src={cat.imageUrl} alt={cat.name} height={60} width={60} />
          </div>
        ))}
      </div>
      <Row>
        {productData
          .filter((i) => i.category === selectedCategory)
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
