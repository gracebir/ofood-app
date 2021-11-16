import axios from "axios"
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING} from '../constants/cartConstants';
import Cookie from 'js-cookie';
const url = "http://127.0.0.1:3700"

const addToCart = (productId,qty) => async(dispatch, getState)=>{
    try {
       const {data} = await axios.get(`${url}/api/product/by-id/${productId}`);
       console.log(data)
       dispatch({
            type:CART_ADD_ITEM, payload: {
            product: data.id,
            name: data.name,
            avatar: data.avatar,
            price: data.price,
            desc: data.desc,
            qty
       }
    });

    const {cart: {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {
        
    }
   
}
const removeFromCart = (productId)=>(dispatch, getState)=>{
    dispatch({type: CART_REMOVE_ITEM, payload: productId})

    const {cart: {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

const saveShipping = (data)=>(dispatch)=>{
    dispatch({type: CART_SAVE_SHIPPING, payload: data})
}

const savePayment = (data)=>(dispatch)=>{
    dispatch({type: CART_SAVE_PAYMENT, payload: data})
}
export{addToCart, removeFromCart, saveShipping, savePayment}