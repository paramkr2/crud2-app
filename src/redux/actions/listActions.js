import {SET_LIST, SET_LOADED , RESET_LOADED ,  UPDATE_LIST} from '../types'
import axios from 'axios'

let base_url = 'https://limitless-coast-84633.herokuapp.com';
//'http://localhost:2000' // 
export const listDocument = (data) => ( dispatch ) =>{
    
    axios.post(base_url + '/list', {username:data} )
    .then( res =>{
        let payload = {list:res.data};
        dispatch({type:SET_LIST, payload:payload })
        dispatch({type:SET_LOADED })
    }).catch( err=>{
        console.log('error',err);
    })
} 

export const editDocument = (data ) => ( dispatch ) =>{
    dispatch({type:RESET_LOADED })
    axios.post( base_url + '/editDocument', data )
    .then( res => {
        console.log( res.data );
        
        return 'inserted'
    }).catch( (err) =>{
        console.log( err );
    })
}

export const deleteDocument = (data) =>(dispatch) => {
    dispatch({type:RESET_LOADED })
    axios.post( base_url + '/removeDocument', data )
    .then(res =>{
        console.log( res.data )
        
        return 'deleted'
    }).catch( (err) =>{
        console.log( 'error:' , err );
    })
}