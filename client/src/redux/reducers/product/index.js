import initialStates from '../../intialStates';
import saveProduct from './saveProduct';


export default (state = initialStates.users, action={})=>({
    ...state,
    ...saveProduct(state, action),
})