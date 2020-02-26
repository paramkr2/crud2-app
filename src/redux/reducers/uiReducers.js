import {CLEAR_ERRORS,SET_ERRORS} from '../types'

let initialState = {
    errors:{},
}

function reducerFunction( state=initialState, action ){
    switch( action.type ){
        case SET_ERRORS:
            return{
                ...state,
                ...action.payload
            }
        case CLEAR_ERRORS:
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