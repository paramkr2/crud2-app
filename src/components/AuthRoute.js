import { Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux'
import React from 'react';

// for redirecting to home if token present and valid
function A1({component:Component, authenticated, ...rest}){
    console.log( authenticated);
    return(
        
        <Route
            {...rest} 
            render = { (props) =>
                (authenticated !== true)? ( <Component {...props}/> ) : < Redirect  to='/' />

            }
        />
    )
}

const mapStateToProps = (state) =>({
    user:state.user,
    authenticated:state.user.authenticated,
})
// redirect to login page if token not present and valid 
export const AuthRoute2 =  
    connect(mapStateToProps)(
        ({component:Component, authenticated, ...rest}) =>  {
        console.log( authenticated);
        return(
            
            <Route
                {...rest} 
                render = { (props) =>
                    (authenticated === true)? ( <Component {...props}/> ) : < Redirect  to='/login' />

                }
            />
        )
})



export const AuthRoute1 = connect(mapStateToProps)(A1)

