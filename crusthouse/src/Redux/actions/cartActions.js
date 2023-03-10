import axios from "axios";
import { toast } from "react-toastify";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_EDIT_ITEM } from "../constants/cartConstants";

// for add item to cart
export const addToCart = (id, qty, optionId, name) => async (dispatch, getState) => {
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
      option_id: optionId,
      option_name: name,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems));
};


// for update cart item
export const editCartItem = (product, option_id, qty) => (dispatch, getState) => {
  const { Cart: { cartItems } } = getState();

  dispatch({
    type: CART_EDIT_ITEM,
    payload: {
      product,
      option_id,
      qty
    }
  });
};

// for remove item from cart
export const removeFromCart = (id, option) => (dispatch, getState) => {
  const { cartItems } = getState().Cart;
  const updatedCartItems = cartItems.filter((item) => item.product !== id && item.option_id !== option);
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: updatedCartItems,
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
};