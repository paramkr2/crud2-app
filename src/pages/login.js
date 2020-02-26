import React from 'react';
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'
import {withRouter} from 'react-router-dom'
import './pages.css'

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
        const {loading } = this.props.user ;
        const {errors} = this.props.ui;
        console.log('loading',loading);
        return(

            <div className = 'flexContainer' > 
                <div className='col-3' > </div>
                <div className='col-6' >
                    <form onSubmit={this.handleSubmit}>
                        Username:<input style={ errors.username||errors.error?{borderColor:'red'}:{}} type="text" name='username' onChange={this.handleChange} value={this.state.username} placeholder='username'/>
                        {errors.username && <label> {errors.username} </label>}
                        <br/>
                        Password:<input type="text" style={ errors.password||errors.error?{borderColor:'red'}:{}} name='password' onChange={this.handleChange} value={this.state.password} placeholder="password" />
                        {errors.password && <label> {errors.password}</label>}
                        <br/>
                        <button type="submit" value="submit" style={loading?{color:'green'}:{}} >Button</button> 
                        {errors.error && <label> {errors.error}</label>}
                        
                    </form> 
                </div>
                <div className='col-3' > </div>

            </div>
        )
    }
}

let mapStateToProps = (state) =>({
    user:state.user,
    ui:state.ui,
})

const mapActionToProps = {
    loginUser 
}

export default connect(mapStateToProps,mapActionToProps)( withRouter(Login));