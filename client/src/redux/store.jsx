import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import initialStates from './intialStates';
import reducer from './reducers/index';

const middleware = [thunk];

const store =() =>{
    return createStore(
        reducer,
        initialStates, 
        composeWithDevTools(applyMiddleware(...middleware)),
    );
} 

export default store;