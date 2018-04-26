import React, { Component } from 'react';
import axios from 'axios';
import Users from './Users';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true  // enable axios post cookie, default false
class Main extends Component {
    constructor(props) {
        super(props);
        this.state={
            userData:null,
            error:null
        }
        axios.get('http://localhost:8000/api/currentUser')
        .then((res)=>{
            if(res.data.isLoggedin){
               return  this.setState({userData:res.data})
            }
            return this.setState({userData:null, error:res.data.err, message:res.data.message});
        })
    }
    
  
    render() {
        if(this.state.error){return(
            <div>
            <p>{this.state.message}</p>
            <Link className='btn btn-success' to='/' >Go Home</Link>
            </div>
        ) }
        return (     
            <div>
               {this.state.userData && <Users />}
            </div>
        );
    }
}

export default Main;
