import React from 'react';
import {Link} from 'react-router-dom'
import './components.css'

import store from '../redux/store';
import {CLEAR_USER, CLEAR_LIST} from '../redux/types';
import {connect} from 'react-redux'

class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.logOutUser = this.logOutUser.bind(this);
    }
    logOutUser(){
        localStorage.removeItem('FBIdToken');
        store.dispatch({type:CLEAR_USER})
        store.dispatch({type:CLEAR_LIST})
    }
    render(){
        const {authenticated} = this.props.user;
        return(
            <div > 
                <ul className='topnav' >
                    <li > <Link to='/'> Home  </Link></li>
                    <li  > <Link to='/login' > Login </Link></li>
                    {!authenticated && <li  > <Link to='/signup' > SignUp </Link></li>}
                    {authenticated && <li > <a href='#' onClick={this.logOutUser}>Logout </a> <br/> </li> }
                </ul>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user:state.user
})


let whatItReturns = connect(mapStateToProps) ;
export default whatItReturns(Navbar)

