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
        this.handleCancel= this.handleCancel.bind(this);
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

    handleCancel(){
        this.setState({edit:false});
    }

    render(){
        let {credentials:{_id,email,username , firstName, lastName, age, bio }} = this.props.user;
        let edit = this.state.edit;

        return(
            <div className='profileContainer'> 
                <h3>User Profile</h3>

                { edit || 
                    <ul className="profileList">
                        <li> <b>Id: </b>        {_id}</li>
                        <li> <b>Email: </b>         {email}  </li>
                        <li> <b>Username: </b>   { username}</li>
                        <li><b>FirstName:</b>    { firstName}</li>
                        <li><b>LastName:</b>    { lastName}</li>
                        <li><b>Age:</b>    { age}</li>
                        <li><b>Bio:</b>    { bio}</li>
                        <li> <a href='#' onClick={this.setEdit} >Edit Profile </a> </li>
                    </ul>
                } 
                { !edit || 
                    <form onSubmit={this.handleSubmit}>
                        Email: <input type="text" name='email' onChange={this.handleChange} value={this.state.email} placeholder="Email" />
                        <br/>FirstName: <input type="text" name='firstName' onChange={this.handleChange} value={this.state.firstName} placeholder='firstName'/>
                        <br/>LastName: <input type="text" name='lastName' onChange={this.handleChange} value={this.state.lastName} placeholder='lastName'/>
                        <br/>Age: <input type="text" name='age' onChange={this.handleChange} value={this.state.age} placeholder='age'/>
                        <br/>Bio: <input type="text" name='bio' onChange={this.handleChange} value={this.state.bio} placeholder='bio'/>
                        <br/><button type="submit" value="submit" >Submit</button>
                        <button type="cancel" onClick={this.handleCancel} >Cancel</button>
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