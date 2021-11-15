import { PRODUCT_REGISTER_FAIL, PRODUCT_REGISTER_REQUEST, PRODUCT_REGISTER_SUCCESS } from "../../constants/productConstants";



export default (state, {type, payload}) =>{
    switch (type) {
        case PRODUCT_REGISTER_REQUEST:
           return{
               ...state,
               productRegister:{
                    ...state.productRegister,
                    loading: true,
                    error:null
               }
           };
        case PRODUCT_REGISTER_SUCCESS:
            return{
                ...state,
                productRegister: {
                    ...state.productRegister,
                    loading: false,
                    data: payload,
                }
            };
        case PRODUCT_REGISTER_FAIL:
            return {
                ...state,
                productRegister: {
                    ...state.productRegister,
                    loading:false,
                    error: payload
                }
            }
    }
}