import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from './Nav';

function Result(props) {
    return (
        props.users.map((user)=>{
            return(
                <ul className='users' key={user._id}>
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.jobtitle}</p>
                    <Link className='btn btn-success' to={'/user/'+user._id}>More Details</Link>
                </div>

                </ul>
            )
        })
    )
}


class Users extends Component {
    constructor(props) {
        super(props);
        this.state={
            users:null
        }
    }
    componentDidMount(){
        axios.get('http://localhost:8000/api/users/')
        .then((res)=>this.setState({users:res.data}))
    }
    logoutHandler(){
        axios.get('http://localhost:8000/api/logout').then((res)=>null);
    }
    render() {
        return (
            <div>
            <Nav/>
            {this.state.users && <Result users ={this.state.users} />}
            
            </div>
        );
    }
}

export default Users;
