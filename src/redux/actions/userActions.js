import {AUTHENTICATE_USER , LOADING_USER , NOT_LOADING_USER , 
    SET_USER, SET_LOADED , RESET_LOADED ,SET_ERRORS , 
    CLEAR_ERRORS ,CREATED_DOCUMENT , CREATING_DOCUMENT,
     SET_CREATE_MESSAGE , RESET_CREATE_MESSAGE } from '../types';
import axios from 'axios'

let base_url = 'http://localhost:2000' // 'https://limitless-coast-84633.herokuapp.com'

export const signupUser = ( data , history ) => (dispatch) =>{
    dispatch( {type: LOADING_USER});
    dispatch({type:CLEAR_ERRORS});
    axios.post(base_url + '/signup', data )
        .then( res => {
            console.log( res.data );
            if(res.data.token){
                history.push('/');
                let token = `Bearer ${res.data.token}` ;
                localStorage.setItem( 'FBIdToken', token ) ;
                axios.defaults.headers.common['Authorization'] = token ;
                dispatch( getUserDetails() );
                
            }else if( res.data.error){
                dispatch({ type: NOT_LOADING_USER} )
                return console.log(res.data.error);
                
            }
            
        })
        .catch( err =>  {
            dispatch({ type: NOT_LOADING_USER} )
            try{
                console.log( 'err', err.response.data );
                dispatch({type:SET_ERRORS, payload:{errors:err.response.data} })
            }
            catch(err){
                console.log(err);
            }
            
        })
    
}

export const loginUser = (data , history) => (dispatch) =>{
    dispatch({type:CLEAR_ERRORS})
    dispatch( {type: LOADING_USER});
    axios.post( base_url + '/login', data )
        .then( res => {
            console.log( res.data );
            if( res.data.token ){
                history.push('/');
                let token = `Bearer ${res.data.token}`
                localStorage.setItem( 'FBIdToken', token );
                axios.defaults.headers.common['Authorization'] = token; 
                dispatch( getUserDetails());

            } else if( res.data.error ){
                dispatch({ type: NOT_LOADING_USER} )
                return console.log(res.data.error);
            }
            
        })
        .catch( err => {
            try{
                console.log(err.response.data);        
                dispatch( {type:SET_ERRORS , payload:{errors:err.response.data}})    
                
            }
            catch(err){
                console.log(err);
            }
            dispatch({ type: NOT_LOADING_USER} )
        }) 
    
    
}

export const getUserDetails = (data) => (dispatch) => {
    console.log('in get user ')
    axios.get( base_url + '/user')
        .then( res =>{
            if( res.data !== {} ){
                let data = {credentials:res.data}
                dispatch( {type:SET_USER, payload:res.data })
                dispatch({ type: NOT_LOADING_USER} )
            }
            else{
                return console.log( res.data)
            }
        }).catch( err =>{
            console.log(err);
        })
}

export const sendDocument = ( data  )  => {
    return function( dispatch){
        // this will make sure that the list will reload again ..
        dispatch( {type:RESET_CREATE_MESSAGE} )
        dispatch( {type:RESET_LOADED})
        dispatch({ type:CREATING_DOCUMENT})
        console.log(data);   
        axios.post( base_url + '/create',data)
        .then( res =>{       
            console.log('Successfully created docuemnt', res.data );
            dispatch({ type:CREATED_DOCUMENT})
            let payload = {message : { create : 'Successfully Inserted '}}
            dispatch({ type:SET_CREATE_MESSAGE,  payload  })
        })
        .catch( err =>{
            console.log( 'error creating document ', err );
            dispatch({ type:CREATED_DOCUMENT})
            let payload = {message : { create : 'Error Creating Document'}}
            dispatch({ type:SET_CREATE_MESSAGE,  payload  })
        })
    }
}


export const updateProfile = ( data ) => ( dispatch) => {

    axios.post( base_url + '/updateuser', data)
    .then( res=>{
        
        dispatch({type:SET_USER, payload:data  })
        return res.data ;
    }).catch( err =>{
        try{
            console.log( err.response.data )
        }catch{
            console.log('updateProfileerro', err);
        }
    })
}


