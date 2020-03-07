import  React, {Component} from 'react';
import loadingGif from './loading.gif'
// redux stuff 
import {connect} from 'react-redux'
import {sendDocument} from '../redux/actions/userActions'
import reducerFunction from '../redux/reducers/listReducers';

class CreateDocument extends Component{
    constructor( props ){
        super(props)
        this.state = {
            title:'',
            content:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('submitted');
        this.props.sendDocument({ ...this.state, username:this.props.user.credentials.username } );
    }
    
    handleChange(event){
        event.preventDefault();
        this.setState({[event.target.name] : event.target.value});

    }
    resetForm(){
        this.setState({
            title:'',
            content:''
        })
    }


    render(){
        const {creating , message:{create}} = this.props.list;
        return(
            <div className="createDocument">
                 <br/>
                {creating && <img src={loadingGif} /> }
                {!creating && <form onSubmit={this.handleSubmit}>
                    <input type='text' name='title' value={this.state.title} required onChange={this.handleChange} placeholder='Title' />
                    <br/><textarea row='50' col='40' type='text' name='content' required value={this.state.content} onChange={this.handleChange} placeholder='Write A Note '/>
                    <br/> < button type='submit' value='submit'> Create </button> 
                    { create && <div style={{color:'red',fontSize:'15px'}}> {create}  </div>  }
                </form>
                }   

            </div>
        )

    }
}

function mapStateToProps(state){
    return { user:state.user
            , list:state.list }
}

const mapActionToProps = {
    sendDocument,
}

export default connect(mapStateToProps, mapActionToProps )(CreateDocument)

