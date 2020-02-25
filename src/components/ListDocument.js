import React , {Component} from 'react'

//redux stuff
import {connect} from 'react-redux'
import {listDocument} from '../redux/actions/listActions'

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
            return <li>{item.title} :{item.content} </li> 
        })
        return (<ol>{list}</ol>);
    }
    render(){
        
        const { list , loaded } = this.props.list 
        const { authenticated } = this.props.user
        console.log( loaded);
        return(
            <div>
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

