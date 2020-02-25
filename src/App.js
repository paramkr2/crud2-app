import React , {Component} from 'react';
import {BrowserRouter as Router , Link , Switch , Route} from 'react-router-dom'
import './App.css';
import fs from 'fs'
// components and pages
import Navbar from './components/Navbar'
import Login from './pages/login'
import SignUp from './pages/signup'
import Home from './pages/home'
import {AuthRoute1,AuthRoute2} from './components/AuthRoute'
import jwtDecode from 'jwt-decode'
//redux stuff 
import {Provider} from 'react-redux'
import store from './redux/store'
import { SET_USER, AUTHENTICATE_USER } from './redux/types';
import {getUserDetails} from './redux/actions/userActions'
import axios from 'axios';
let tk = localStorage.getItem('FBIdToken');

if( tk !== null ){
  let token = jwtDecode(tk.split(' ')[1]);
  console.log(token);
  const {username,iat} = token;

  if(  (new Date()).getTime() - iat*1000 < 10000000 ){
    store.dispatch({type:AUTHENTICATE_USER});
    axios.defaults.headers.common['Authorization'] = tk ; 
    store.dispatch( getUserDetails() );
  }
}



class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar/>
            <hr/>
            <Switch>
              <AuthRoute1 path='/signup' component={SignUp}/>
              <AuthRoute1 path='/login' component={Login} />
              <AuthRoute2 path='/' component={Home} />
            </Switch>
          </Router> 
        </div>
      </Provider>
    
  )}
}

export default App;
