import {GET_CURRENT_USER_REQUEST,GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_FAIL} from '../../constants/userConstants'

export default (state, {type, payload}) =>{
    switch(type){
        case GET_CURRENT_USER_REQUEST:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: true,
                    error: null
                }
            };

        case GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: false,
                    data: payload,
                    auth: true
                }
            }

        case GET_CURRENT_USER_FAIL:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: false,
                    error: payload,
                    auth: false
                }
            }
    }
}