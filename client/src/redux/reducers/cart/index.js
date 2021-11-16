import Cookie from "js-cookie";
import { cartAddReducer } from "./cartItemReducer";

const cartItems = JSON.parse(Cookie.get('cartItems'))

const initialStates = { cart: {cartItems}, shipping:{}, payment:{}};

export default (state =initialStates.cart, action={})=>({
   ...state,
    ...cartAddReducer(state, action),
})