import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../../constants/productConstants";


export default (state, {type, payload}) =>{
    switch (type) {
        case PRODUCT_LIST_REQUEST:
           return{
               ...state,
               productList:{
                    ...state.productList,
                    loading: true,
                    error:null
               }
           };
        case PRODUCT_LIST_SUCCESS:
            return{
                ...state,
                productList: {
                    ...state.productList,
                    loading: false,
                    data: payload,
                }
            };
        case PRODUCT_LIST_FAIL:
            return {
                ...state,
                productList: {
                    ...state.productList,
                    loading:false,
                    error: payload
                }
            }
    }
}