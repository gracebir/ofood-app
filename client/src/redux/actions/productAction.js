import axios from 'axios';
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REGISTER_FAIL, PRODUCT_REGISTER_REQUEST, PRODUCT_REGISTER_SUCCESS } from '../constants/productConstants';

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

export const getAllProduct = async(dispatch, history) =>{

    dispatch({
        type: PRODUCT_LIST_REQUEST
    });

    try {
        const res = await axios.get(`${url}/api/product/`, {
            headers: {
                'authtoken': localStorage.getItem('authtoken')
            }
        });
        if(res.status === 200){
            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: res.data.data
            })
            console.log(res.data.data, "------------")
        }
    } catch (error) {
        const res = error.response;

        if(error && error.status === 401){
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: res.data.error
            });
            // history.push('/login', { next: '/admin' });
        }else{
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: 'Connexion impossible, veuillez reessayer'
            })
        }
    }
}
