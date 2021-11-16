import { combineReducers } from "redux";
import users from "./user";
import products from './product';
import cartItems from './cart'
export default combineReducers({
    users,
    products,
    cartItems,
})