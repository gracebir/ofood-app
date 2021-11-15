import axios from 'axios';
import { GET_CURRENT_USER_FAIL, GET_CURRENT_USER_REQUEST, GET_CURRENT_USER_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

const url = "http://127.0.0.1:3700"

export const loginAction = (data) => async(dispatch) =>{
    dispatch({
        type: USER_LOGIN_REQUEST
    });

    try {
        const res = await axios.post(`http://127.0.0.1:3700/api/user/login`, data);
        if(res.status  === 200){
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: res.data
            });
            localStorage.setItem('authtoken', res.data.token);
            window.location.href = "/"
        };
        console.log(res.status);
    } catch (error) {
        console.log(error);
        const res = error.response;
        if(res && res.status === 401){
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: res.data.message
            })
        }else{
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: 'Connexion impossible, veuillez reessayer'
            })
        }
    }
};

export const checkToken = ()=>{
    if(!localStorage.getItem('authtoken')) window.location.replace('/login')
    
}
export const getCurrentUser = async(dispatch, history) =>{

    dispatch({
        type: GET_CURRENT_USER_REQUEST
    });

    try {
        const res = await axios.get(`${url}/api/user/current-user`, {
            headers: {
                'authtoken': localStorage.getItem('authtoken')
            }
        });
        if(res.status === 200){
            dispatch({
                type: GET_CURRENT_USER_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;

        if(error && error.status === 401){
            dispatch({
                type: GET_CURRENT_USER_FAIL,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: GET_CURRENT_USER_FAIL,
                payload: 'Connexion impossible, veuillez reessayer'
            })
        }
        history.push('/login')
    }

}

export const registerAction = (data)=> async (dispatch, history) =>{
    dispatch({
        type: USER_REGISTER_REQUEST
    });
    try {
        const res = await axios.post(`${url}/api/user/create`, data);
        if(res.status === 201){
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: res.data
            });
            // history.push('/users');
            window.location.replace('/')
        };
    } catch (error) {
        console.log(error)
      const res = error.response;
      if(res && res.status === 409){
          dispatch({
              type: USER_REGISTER_FAIL,
              payload: res.data.message
          })
      }else {
          dispatch({
              type: USER_REGISTER_FAIL,
              payload: 'Enregistrement Impossible, Veuillez reesayer'
          })
      }  
    }
}

export const getAllUsers = async(dispatch, history) =>{

    dispatch({
        type: USER_LIST_REQUEST
    });

    try {
        const res = await axios.get(`${url}/api/user/all`, {
            headers: {
                'authtoken': localStorage.getItem('authtoken')
            }
        });
        if(res.status === 200){
            dispatch({
                type: USER_LIST_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;

        if(error && error.status === 401){
            dispatch({
                type: USER_LIST_FAIL,
                payload: res.data.error
            });
            history.push('/login', { next: '/users' });
        }else{
            dispatch({
                type: USER_LIST_FAIL,
                payload: 'Connexion impossible, veuillez reessayer'
            })
        }
    }

}