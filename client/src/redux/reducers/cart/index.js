import Cookie from "js-cookie";
import { cartAddReducer } from "./cartItemReducer";
import intialStates from "../../intialStates";

const cartItems = JSON.parse(Cookie.get('cartItems'))


export default (state =intialStates.cart, action={})=>({
   ...state,
    ...cartAddReducer(state, action),
})