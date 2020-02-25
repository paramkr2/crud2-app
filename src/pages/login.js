import React from 'react';
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'
import {withRouter} from 'react-router-dom'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            password:'',
            username:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('submitted');
        this.props.loginUser(this.state, this.props.history);
    }
    
    handleChange(event){
        event.preventDefault();
        this.setState({[event.target.name] : event.target.value});

    }

    render(){
        const {loading} = this.props;
        return(

            <div> 
                <form onSubmit={this.handleSubmit}>
                    username: <input type="text" name='username' onChange={this.handleChange} value={this.state.username} placeholder='username'/>
                    <br/>
                    PassWord: <input type="text" name='password' onChange={this.handleChange} value={this.state.password} placeholder="password" />
                    <br/>
                      <button type="submit" value="submit" >Submit</button> 
                      {!loading || <h1> Loading....</h1>}
                </form>

            </div>
        )
    }
}

let mapStateToProps = (state) =>({
    user:state.user
})

const mapActionToProps = {
    loginUser 
}

export default connect(mapStateToProps,mapActionToProps)( withRouter(Login));