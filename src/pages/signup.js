import React from 'react';
import {withRouter} from 'react-router-dom'
//redux stuff
import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userActions'
import './pages.css'


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
        const {errors} = this.props.ui;
        return(
            <div style={{textAlign:'center'}}>
                <h1> Signup Page </h1>
                <div className='flexContainer'> 
                    <div className='col-3' ></div>
                    <div className='col-6' >
                        <form onSubmit={this.handleSubmit}>
                            Email: <br/><input type="text" name='email' onChange={this.handleChange} value={this.state.email} placeholder="Email" />
                            {errors.email && <label> {errors.email} </label>}
                            <br/>PassWord: <br/><input type="text" name='password' onChange={this.handleChange} value={this.state.password} placeholder="password" />
                            {errors.password && <label> {errors.password} </label>}
                            <br/>Confirm Password:<br/> <input type="text" name='confirmPassword' onChange={this.handleChange} value={this.state.confirmPassword} placeholder="confirmPassword" />
                            {errors.confirmPassword && <label> {errors.confirmPassword} </label>}
                            <br/>username:<br/> <input type="text" name='username' onChange={this.handleChange} value={this.state.username} placeholder='username'/>
                            {errors.username && <label> {errors.username} </label>}
                            <br/><button type="submit" value="submit" >Submit</button>
                            {errors.errors && <label> {errors.errors} </label>}
                        </form>
                    </div>
                    <div className='col-3' ></div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user:state.user,
    ui:state.ui,
})

const mapActionToProps = {
    signupUser,
}
let whatItReturns = connect(mapStateToProps,mapActionToProps) ;
export default whatItReturns(withRouter(SignUp));
