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

        this.switchView = this.switchView.bind(this);
    }

    switchView(){
        let boo = this.state.create?false:true ;
        this.setState({ create:  boo })
    }
    
    render(){
        return(
            <div >
                
                
                <div className='flexContainer'> 
                    <div className = 'col-6'>
                        <a className='switchClass' href='#' onClick={this.switchView}> Switch </a> <br/>
                        <br/>{ !this.state.create || <div > <ListDocument/> </div> }
                        { this.state.create || <div > <CreateDocument/> </div> }
                    </div>
                    <div className='col-6'> <Profile/> </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);