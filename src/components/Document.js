import React, {Component} from 'react'
import './components.css';

//redux stuff 
import {connect } from 'react-redux'
import {editDocument , deleteDocument} from '../redux/actions/listActions'

class Document extends Component {
    constructor( props ){
        super(props);
        this.state = {edit:false, title : '', content : '' }
        
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);


    }

    handleEdit = (event) => {
        event.preventDefault();
        const {title, content } = this.props.item;
        this.setState( {edit : true , title:title, content:content });
    }

    handleDelete = (event) =>{
        event.preventDefault();
        console.log( 'buttotn pressed ');
    }

    handleChange(event){
        event.preventDefault();
        this.setState({[event.target.name] : event.target.value});
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.setState( {edit:false} ); 
        this.props.item.title = this.state.title;
        this.props.item.content = this.state.content;

        let res = this.props.editDocument( { ...this.props.item , username:this.props.user.username });
        console.log(res);
    }
    handleDelete = (event) =>{
        this.props.deleteDocument( this.props.item );
    }

    render(){
        console.log(this.props)
        let edit = this.state.edit;
        const { title , content , _id } = this.props.item;
        return(
            <div>
                {!edit && 
                <div className="listItem" >
                    
                    <h2> {title} </h2>
                    <h3> {content} </h3>
                    < div className="listItemButtons" >
                        <button onClick={this.handleEdit }>Edit</button> 
                        <button onClick={this.handleDelete}> Delete </button>
                    </div>
                    
                </div>
                }
                {edit && 
                    <div className="listItem" >
                        < form onSubmit={this.handleSubmit} >
                            <input type="text" value={this.state.title} name='title' onChange = {this.handleChange} />
                            <input type="text" value={this.state.content} name='content' onChange = {this.handleChange} />
                            <button> Submit </button>
                        </form>
                    
                    
                    </div>
                }
                <br/>
            </div>
        )
    }
}

let mapStateToActions = (state) =>({
    user:state.user,

})
let mapActionToProps = {
    editDocument,
    deleteDocument
}
export default connect( mapStateToActions, mapActionToProps)(Document);