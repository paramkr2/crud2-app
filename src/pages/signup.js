import React from 'react';
import {withRouter} from 'react-router-dom'
//redux stuff
import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userActions'

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            confirmPassword:'',
            username:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleSubmit(event){
        event.preventDefault();
        console.log( this.state );

        let token = this.props.signupUser( this.state , this.props.history );
        console.log(token);
    }
    
    handleChange(event){
        event.preventDefault();
        this.setState({ [event.target.name] : event.target.value});

    }

    render(){
        const {loading} = this.props.user;
        return(
            <div> 
                <h1> Signup Page </h1>
                <form onSubmit={this.handleSubmit}>
                    Email: <input type="text" name='email' onChange={this.handleChange} value={this.state.email} placeholder="Email" />
                    <br/>PassWord: <input type="text" name='password' onChange={this.handleChange} value={this.state.password} placeholder="password" />
                    <br/>Confirm Password: <input type="text" name='confirmPassword' onChange={this.handleChange} value={this.state.confirmPassword} placeholder="confirmPassword" />
                    <br/>username: <input type="text" name='username' onChange={this.handleChange} value={this.state.username} placeholder='username'/>
                    <br/><button type="submit" value="submit" >Submit</button>
                    {!loading || <h1> Loading....</h1>}
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user:state.user
})

const mapActionToProps = {
    signupUser,
}
let whatItReturns = connect(mapStateToProps,mapActionToProps) ;
export default whatItReturns(withRouter(SignUp));
