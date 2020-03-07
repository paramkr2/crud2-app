import React from 'react';
import Profile from '../components/Profile'
import CreateDocument from '../components/CreateDocument'
import ListDocument from '../components/ListDocument'
import './pages.css' 
import {withRouter} from 'react-router-dom'

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { create:true } ;

        this.listDocument = this.listDocument.bind(this);
        this.createDocument = this.createDocument.bind(this);
    }

    listDocument(){
        
        this.setState({ create:  false })
    }
    createDocument(){
        this.setState({create:true})
    }
    
    render(){
        return(
            <div >
                
                
                <div className='flexContainer'> 
                    <div className = 'col-6'>
                        <button className='navigationButtons' onClick={this.createDocument} style={this.state.create?{backgroundColor:'white',color:'black'}:{}}>Create Document</button> 
                        <button className='navigationButtons' onClick={this.listDocument}  style={!this.state.create?{backgroundColor:'white',color:'black'}:{}}>List Document</button>
                        
                        <br/>{ !this.state.create && <div > <ListDocument/> </div> }
                        { this.state.create && <div > <CreateDocument/> </div> }
                    </div>
                    <div className='col-6'> <Profile/> </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);