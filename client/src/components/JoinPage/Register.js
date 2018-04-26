import React, { Component } from 'react'
import axios from 'axios';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:{
        name:'', 
        email:'',
        password:'',
        jobtitle:'',
      },
      err:null
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  
  submitHandler(){
    console.log(this.state.data);
    axios.post("http://localhost:8000/api/register", this.state.data).then((res)=>{
      if(res.data.err){
       return this.setState({err:res.data.err})
      }
      if(res.data.ok){
        return this.setState({err:"Succesfully registerated"})
      }
      console.log(res);
    });
  }

  changeHandler(e){
    var formData = this.state.data;
    formData[e.target.name] = e.target.value;
    this.setState({
        data : formData
    })
  }

  render() {
    return (
      <div>
        <h3>Register</h3>
        {this.state.err &&<p className="btn-danger" >{this.state.err}</p>}
      <form onSubmit={this.submitHandler}>
        <div className="row">
            <div className="col">
              <input type="text" onChange={this.changeHandler} name='name' className="form-control" value={this.state.data.name} placeholder="Name"/>
          </div>
          <div className="col">
              <input type="email" onChange={this.changeHandler} name='email' className="form-control" value={this.state.data.email} placeholder="Email"/>
          </div>
        </div>
        <div className="row">
            <div className="col">
              <input type="text" onChange={this.changeHandler} name='jobtitle' className="form-control" value={this.state.data.jobtitle} placeholder="Job Title"/>
          </div>
          <div className="col">
              <input type="password" onChange={this.changeHandler} name='password' className="form-control" value={this.state.data.password} placeholder="Password"/>
          </div>
        </div>
        <button type='submit' className="btn btn-primary">Submit</button>
      </form>
      </div>
    )
  }
}
