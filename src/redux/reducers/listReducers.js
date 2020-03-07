import {SET_LIST , SET_LOADED , RESET_LOADED , 
    CLEAR_LIST, CLEAR_USER , UPDATE_LIST ,
     CREATED_DOCUMENT , CREATING_DOCUMENT 
    , SET_CREATE_MESSAGE , RESET_CREATE_MESSAGE } from '../types'

let initialState = {
    list:[],
    loaded:false,
    creating:false,
    message:{},
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
        case UPDATE_LIST:
            return{
                ...state,
                ...action.payload,
            }
        case CREATING_DOCUMENT:
            return{
                ...state,
                creating:true,
            }
        case CREATED_DOCUMENT:
            return{
                ...state,
                creating:false,
            }
        case SET_CREATE_MESSAGE:
            return{
                ...state,
                ...action.payload
            }
        case RESET_CREATE_MESSAGE:
            return{
                ...state,
                message:{},
            }
        default:
            return{
                ...state
            }
    }
}

export default reducerFunction;