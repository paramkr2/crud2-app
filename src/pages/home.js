import React from 'react';
import Profile from '../components/Profile'
import CreateDocument from '../components/CreateDocument'
import ListDocument from '../components/ListDocument'
import './home.css' 


import {withRouter} from 'react-router-dom'
import store from '../redux/store';
import {CLEAR_USER, CLEAR_LIST} from '../redux/types';
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { create:true } ;

        this.switchView = this.switchView.bind(this);
    }

    switchView(){
        let boo = this.state.create?false:true ;
        this.setState({ create:  boo })
    }
    logOutUser(){
        localStorage.removeItem('FBIdToken');
        store.dispatch({type:CLEAR_USER})
        store.dispatch({type:CLEAR_LIST})
    }
    render(){
        return(
            <div>
                <a href='#' onClick={this.logOutUser}>Logout </a> <br/>
                <a href='#' onClick={this.switchView}> Switch </a> <br/>
                <div className='container'> 
                    
                    { !this.state.create || <div className='col-6'> <ListDocument/> </div> }
                    { this.state.create || <div className='col-6'> <CreateDocument/> </div> }
                    <div className='col-6'> <Profile/> </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);