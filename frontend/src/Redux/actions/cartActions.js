import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
// for add item from cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/menu-item/${id}`);
  const { menuItem } = data;
  console.log(getState());
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: menuItem._id,
      title: menuItem.name,
      description: menuItem.description,
      image: menuItem.image,
      price: menuItem.price,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems));
};
// for delete item from cart
export const removeCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems));
};
