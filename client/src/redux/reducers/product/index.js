import initialStates from '../../intialStates';
import productList from './productList';
import saveProduct from './saveProduct';


export default (state = initialStates.users, action={})=>({
    ...state,
    ...saveProduct(state, action),
    ...productList(state, action),
})