import React from 'react';
import {Link} from 'react-router-dom'

class Navbar extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div> 
                <ul>
                    <li> <Link to='/'> Home </Link></li>
                    <li> <Link to='/login' > Login </Link></li>
                    <li> <Link to='/signup' > SignUp </Link></li>
                </ul>
                

            </div>
        )
    }
}

export default Navbar;