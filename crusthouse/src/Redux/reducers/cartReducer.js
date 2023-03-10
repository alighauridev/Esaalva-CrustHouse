import { toast } from "react-toastify";
import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_EDIT_ITEM,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {
  switch (type) {
    case CART_ADD_ITEM:
      // Check if product already exists in cart
      const exist = state.cartItems.find(
        (x) => x.product === payload.product && x.option_id === payload.option_id
      );
      if (exist) {
        toast.warning("Item is already in your Cart!");
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === exist.product && x.option_id === exist.option_id ? payload : x
          ),
        };
      } else {
        toast.success("Item added to your Cart");
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
        };
      }
    case CART_REMOVE_ITEM:

      return {
        ...state,
        cartItems: payload,
      };
    case CART_CLEAR_ITEMS:
      toast.success("Item cleared");
      return {
        ...state,
        cartItems: [],
      };
    case CART_EDIT_ITEM:
      const item = state.cartItems.find(
        (x) => x.product === payload.product && x.option_id === payload.option_id
      );
      if (item) {
        // edit the quantity of the existing item
        item.qty = payload.qty;
        toast.success("Item quantity updated");
        return {
          ...state,
          cartItems: [...state.cartItems],
        };
      } else {
        toast.warning("Item does not exist in your Cart");
        return state;
      }


    default:
      return state;
  }
};
