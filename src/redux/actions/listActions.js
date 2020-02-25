import {SET_LIST, SET_LOADED , RESET_LOADED} from '../types'
import axios from 'axios'

export const listDocument = (data) => ( dispatch ) =>{
    
    axios.post('http://localhost:2000/list', {username:data} )
    .then( res =>{
        let payload = {list:res.data};
        dispatch({type:SET_LIST, payload:payload })
        dispatch({type:SET_LOADED })
    }).catch( err=>{
        console.log('error',err);
    })

} 