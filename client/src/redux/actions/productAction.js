import axios from 'axios';
import { PRODUCT_REGISTER_FAIL, PRODUCT_REGISTER_REQUEST, PRODUCT_REGISTER_SUCCESS } from '../constants/productConstants';

const url = "http://127.0.0.1:3700"

export const saveProductAction = (data)=> async (dispatch, history) =>{
    dispatch({
        type: PRODUCT_REGISTER_REQUEST
    });
    try {
        const res = await axios.post(`${url}/api/product/create`, data);
        if(res.status === 201){
            dispatch({
                type: PRODUCT_REGISTER_SUCCESS,
                payload: res.data
            });
            // history.push('/users');
            window.location.replace('/admin')
        };
    } catch (error) {
        console.log(error)
      const res = error.response;
      if(res && res.status === 409){
          dispatch({
              type: PRODUCT_REGISTER_FAIL,
              payload: res.data.message
          })
      }else {
          dispatch({
              type: PRODUCT_REGISTER_FAIL,
              payload: 'Enregistrement Impossible, Veuillez reesayer'
          })
      }  
    }
}