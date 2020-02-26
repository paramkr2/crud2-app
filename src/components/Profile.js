import React, {Component} from 'react'
import {connect} from 'react-redux'
import fs from 'fs'
import {updateProfile} from '../redux/actions/userActions'

const st = {
    val:{
        textAlign:'left',
    }
}

class Profile extends Component {
    constructor( props ){
        super(props);        
        this.state = {
            edit:false,
            email:'',
            firstName:'',
            lastName:'',
            age:'',
            bio:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.setEdit = this.setEdit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log( this.state );
        let data = this.state;
        delete data.edit;
        this.props.updateProfile( data );
        
        this.setState({edit:false})
        
    }



    handleChange(event){
        event.preventDefault();
        this.setState({ [event.target.name] : event.target.value});

    }

    setEdit(){
        
        const {credentials:{ _id, email,username,firstName,lastName,age,bio  }} = this.props.user;
        this.setState({edit:true , email:email, username:username, firstName,lastName,age,bio})
    }

    render(){
        let {credentials:{_id,email,username , firstName, lastName, age, bio }} = this.props.user;
        let edit = this.state.edit;

        return(
            <div style={ st.val }> 
                Profile Section

                { edit || 
                    <ul>
                        <li>id:         {_id}</li>
                        <li>email:      {email}  </li>
                        <li>username:   { username}</li>
                        <li>firstName:   { firstName}</li>
                        <li>lastName:   { lastName}</li>
                        <li>age:   { age}</li>
                        <li>bio:   { bio}</li>
                        <li> <a href='#' onClick={this.setEdit} >Edit Profile </a> </li>
                    </ul>
                } 
                { !edit || 
                    <form onSubmit={this.handleSubmit}>
                        Email: <input type="text" name='email' onChange={this.handleChange} value={this.state.email} placeholder="Email" />
                        <br/>firstName: <input type="text" name='firstName' onChange={this.handleChange} value={this.state.firstName} placeholder='firstName'/>
                        <br/>lastName: <input type="text" name='lastName' onChange={this.handleChange} value={this.state.lastName} placeholder='lastName'/>
                        <br/>age: <input type="text" name='age' onChange={this.handleChange} value={this.state.age} placeholder='age'/>
                        <br/>bio: <input type="text" name='bio' onChange={this.handleChange} value={this.state.bio} placeholder='bio'/>
                        <br/><button type="submit" value="submit" >Submit</button>
                        
                    </form>
                }

            </div>
        )
    }
}

function mapStateToProps(state){
    return ({user:state.user})
}

const mapActionToProps = {
    updateProfile,
}

export default connect(mapStateToProps, mapActionToProps)(Profile);