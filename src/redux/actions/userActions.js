import {AUTHENTICATE_USER , LOADING_USER , NOT_LOADING_USER , 
    SET_USER, SET_LOADED , RESET_LOADED ,SET_ERRORS , 
    CLEAR_ERRORS  } from '../types';
import axios from 'axios'

export const signupUser = ( data , history ) => (dispatch) =>{
    dispatch( {type: LOADING_USER});
    dispatch({type:CLEAR_ERRORS})
    axios.post('https://limitless-coast-84633.herokuapp.com/signup', data )
        .then( res => {
            console.log( res.data );
            if(res.data.token){
                history.push('/');
                let token = `Bearer ${res.data.token}` ;
                localStorage.setItem( 'FBIdToken', token ) ;
                axios.defaults.headers.common['Authorization'] = token ;
                dispatch( getUserDetails() );
                
            }else if( res.data.error){
                return console.log(res.data.error);
            }
            dispatch({ type: NOT_LOADING_USER} )
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
    axios.post('https://limitless-coast-84633.herokuapp.com/login', data )
        .then( res => {
            console.log( res.data );
            if( res.data.token ){
                history.push('/');
                let token = `Bearer ${res.data.token}`
                localStorage.setItem( 'FBIdToken', token );
                axios.defaults.headers.common['Authorization'] = token; 
                dispatch( getUserDetails());

            } else if( res.data.error ){
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
        }) 
    dispatch({ type: NOT_LOADING_USER} )
    
}

export const getUserDetails = (data) => (dispatch) => {
    console.log('in get user ')
    axios.get('https://limitless-coast-84633.herokuapp.com/user')
        .then( res =>{
            if( res.data !== {} ){
                let data = {credentials:res.data}
                dispatch( {type:SET_USER, payload:res.data })
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
        dispatch( {type:RESET_LOADED})
        console.log(data);   
        axios.post('https://limitless-coast-84633.herokuapp.com/create',data)
        .then( res =>{       
            console.log('success', res.data );
        })
        .catch( err =>{
            console.log( 'error', err );
        })
    }
}


export const updateProfile = ( data ) => ( dispatch) => {

    axios.post('https://limitless-coast-84633.herokuapp.com/updateuser', data)
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


