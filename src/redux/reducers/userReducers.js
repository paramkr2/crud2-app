import {AUTHENTICATE_USER , LOADING_USER , SET_USER , NOT_LOADING_USER , CLEAR_USER} from '../types';

let initialState = {
    authenticated : false,
    loading : false,
    credentials : {}
}

function reducerFunction( state=initialState, action){
    switch( action.type ){
        case AUTHENTICATE_USER:
            return{
                ...state,
                authenticated :true
            }
        case LOADING_USER:
            return{
                ...state,
                loading:true
            }
        case NOT_LOADING_USER:
            return{
                ...state,
                loading:false
            }
        case SET_USER:
            return{
                ...state,
                loading:false,
                authenticated:true,
                ...action.payload
            }
        case CLEAR_USER:
            return{
                ...initialState
            }
        default:
            return{
                ...state
            }

    }
}


export default reducerFunction;