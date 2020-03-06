import React , {Component} from 'react'

// compoenents 
import Document from './Document'

//redux stuff
import {connect} from 'react-redux'
import {listDocument} from '../redux/actions/listActions'
import './components.css'

class ListDocument extends Component {
    constructor( props ){
        super(props);

        this.getList = this.getList.bind(this);
        this.makeList = this.makeList.bind(this);
    }

    getList(){
        console.log('getting list');
        console.log(this.props.user.credentials.username)
        this.props.listDocument( this.props.user.credentials.username );
        return;
    }

    makeList(){
        console.log( 'createing list');
        let items = this.props.list.list.documents;
        let list =  items.map( function(item){
            return <Document item = {item} /> 
            //return <li>  <div className='title'>{item.title}</div> <br/> <div className='item'>{item.content}</div>   </li> 
        })
        return (list);
    }
    render(){
        
        const { list , loaded } = this.props.list 
        const { authenticated } = this.props.user
        console.log( loaded);
        return(
            <div className='listContainer'>
                {!loaded && authenticated && this.getList()}
                { !loaded || this.makeList() }
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return { user:state.user , list:state.list }
}

const mapActionToProps = {
    listDocument,
}

export default connect(mapStateToProps , mapActionToProps )(ListDocument);

