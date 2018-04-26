import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from './Nav';
axios.defaults.withCredentials = true
function Detail(props) {
    var data= props.userData;
    return(
         <div className="card">
                <div className="card-header">
                    Details
                </div>
                <div className="card-body">
                    <h5 className="card-title"> <b>Name: </b> {data.name}</h5>
                    <p className="card-text"><b>Job Title: </b>  {data.jobtitle}</p>
                    <p className="card-text"><b>Email: </b>  {data.email}</p>
                    <Link className="btn btn-warning" to='/mainpage'>Go Back </Link>
                </div>
            </div> 
    )
}

class Userdetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            userinfo:null
        }
        axios.get('http://localhost:8000/api/users/'+this.props.match.params.userId)
        .then((res)=>this.setState({userinfo:res.data}))
    }

    render() {
        return (
            <div>
            <Nav/>
            {this.state.userinfo && <Detail userData={this.state.userinfo} />}
            </div>
        );
    }
}

export default Userdetail;
