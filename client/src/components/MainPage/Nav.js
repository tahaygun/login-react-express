import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Nav extends Component {
    render() {
        return (
            <div>
            <ul class="nav justify-content-center">
                <li class="nav-item">
                  <Link className='btn nav-link btn-warning' to='/mainpage'>
                        Home
                    </Link>
                </li>
                <li class="nav-item">
                  <Link 
                        className='btn nav-link btn-warning' to='/' 
                        onClick={()=> axios.get('http://localhost:8000/api/logout').then((res)=>null)}>
                        Logout
                    </Link>
                </li>
            </ul>
            </div>
        );
    }
}

export default Nav;
