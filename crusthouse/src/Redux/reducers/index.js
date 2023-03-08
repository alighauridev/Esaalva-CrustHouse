import { combineReducers } from "redux";
import { getFilterProductReducer } from "./filterProductReducer";
import { cartReducer } from "./cartReducer";
import { allProductsReducer, productCreateReviewReducer, singleProductReducer } from "./productReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./userReducers";
import { shippingDetailsReducer } from "./checkoutReducer";
import {
  allOrdersReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./orderReducers";
const RootReducer = combineReducers({
  Products: allProductsReducer,
  ProductDetails: singleProductReducer,
  ProductCreateReview: productCreateReviewReducer,
  Cart: cartReducer,
  Checkout: shippingDetailsReducer,
  UserLogin: userLoginReducer,
  UserUpdate: userUpdateReducer,
  UserRegister: userRegisterReducer,
  OrderCreate: orderCreateReducer,
  OrderDetails: orderDetailsReducer,
  OrderPay: orderPayReducer,
  Orders: allOrdersReducer,
  filterData: getFilterProductReducer,

});

export default RootReducer;
