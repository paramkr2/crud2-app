import  React, {Component} from 'react';

// redux stuff 
import {connect} from 'react-redux'
import {sendDocument} from '../redux/actions/userActions'

class CreateDocument extends Component{
    constructor( props ){
        super(props)
        this.state = {
            title:'',
            content:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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


    render(){
        
        return(
            <div>
                Create Document <br/>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' name='title' value={this.state.title} onChange={this.handleChange} placeholder='Title' />
                    <br/><input type='text' name='content' value={this.state.content} onChange={this.handleChange} placeholder='Write A Note '/>
                    <br/> < button type='submit' value='submit'> Create </button>
                </form>

            </div>
        )

    }
}

function mapStateToProps(state){
    return { user:state.user}
}

const mapActionToProps = {
    sendDocument,
}

export default connect(mapStateToProps, mapActionToProps )(CreateDocument)

