import { USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "../../constants/userConstants";

export default (state, {type, payload}) =>{
    switch(type){
        case USER_LIST_REQUEST:
            return {
                ...state,
                usersList: {
                    ...state.usersList,
                    loading: true,
                    error: null
                }
            };

        case USER_LIST_SUCCESS:
            return {
                ...state,
                usersList: {
                    ...state.usersList,
                    loading: false,
                    data: payload,
                    error: null
                }
            }

        case USER_LIST_FAIL:
            return {
                ...state,
                usersList: {
                    ...state.usersList,
                    loading: false,
                    error: payload
                }
            }
    }
}