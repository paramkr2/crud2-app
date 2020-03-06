import {SET_LIST, SET_LOADED , RESET_LOADED ,  UPDATE_LIST} from '../types'
import axios from 'axios'

export const listDocument = (data) => ( dispatch ) =>{
    
    axios.post('/list', {username:data} )
    .then( res =>{
        let payload = {list:res.data};
        dispatch({type:SET_LIST, payload:payload })
        dispatch({type:SET_LOADED })
    }).catch( err=>{
        console.log('error',err);
    })
} 

export const editDocument = (data ) => ( dispatch ) =>{

    axios.post( '/editDocument', data )
    .then( res => {
        console.log( res.data );
        return 'inserted'
    }).catch( (err) =>{
        console.log( err );
    })
}

export const deleteDocument = (data) =>(dispatch) => {
    axios.post( '/removeDocument', data )
    .then(res =>{
        console.log( res.data )
        return 'deleted'
    }).catch( (err) =>{
        console.log( 'error:' , err );
    })
}