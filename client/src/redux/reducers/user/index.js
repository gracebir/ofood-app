import initialStates from '../../intialStates';
import login from './login';
import currentUser from './currentUser';
import getAll from './getAll';
import register from './register';

export default (state = initialStates.users, action={})=>({
    ...state,
    ...login(state, action),
    ...currentUser(state, action),
    ...getAll(state,action),
    ...register(state, action)
})