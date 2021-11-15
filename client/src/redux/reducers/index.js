import { combineReducers } from "redux";
import users from "./user";
import products from './product';
export default combineReducers({
    users,
    products,
})