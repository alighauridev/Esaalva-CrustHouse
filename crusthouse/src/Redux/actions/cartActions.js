import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
// for add item from cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  console.log(getState());
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      title: data.name,
      price: data.price,
      recipe_id: data.recipe_id,
      class_id: data.class_id,
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
