import {SET_LIST , SET_LOADED , RESET_LOADED , CLEAR_LIST, CLEAR_USER} from '../types'

let initialState = {
    list:[],
    loaded:false,
}

function reducerFunction( state=initialState , action ){
    switch(action.type){
        case SET_LIST:
            return{
                ...state,
                ...action.payload,
            }
        case SET_LOADED:
            return{
                ...state,
                loaded : true,
            }
        case RESET_LOADED:
            return{
                ...state,
                loaded:false,
            }
        case CLEAR_LIST:
            return{
                ...initialState,
            }
        default:
            return{
                ...state
            }
    }
}

export default reducerFunction;