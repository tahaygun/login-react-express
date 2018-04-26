import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import axios from 'axios';
export default class Home extends Component {
  constructor(props) {
    super(props);
    axios.get('http://localhost:8000/api/currentUser')
    .then((res)=>{
        if(res.data.isLoggedin){
           return  this.props.history.push('/mainpage')
        }
    })
  }
  
  render() {
    return (
      <div>
        <Login history={this.props.history} />
        <br/>
        <Register/>
      </div>
    )
  }
}
