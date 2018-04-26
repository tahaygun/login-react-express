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
      err:null,
      errors:null
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  
  submitHandler(e){
    e.preventDefault();
    axios.post("http://localhost:8000/api/register", this.state.data).then((res)=>{
      console.log(res.data.errors);
      if(res.data.errors){
        console.log('noo');
       return this.setState({errors:res.data.errors})
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
              {this.state.errors && this.state.errors.name && <p className="text-danger"> {this.state.errors.name.msg}</p>}
            
          </div>
          <div className="col">
              <input type="email" onChange={this.changeHandler} name='email' className="form-control" value={this.state.data.email} placeholder="Email"/>
              {this.state.errors && this.state.errors.email && <p className="text-danger"> {this.state.errors.email.msg}</p>}
          </div>
        </div>
        <div className="row">
            <div className="col">
              <input type="text" onChange={this.changeHandler} name='jobtitle' className="form-control" value={this.state.data.jobtitle} placeholder="Job Title"/>
              {this.state.errors && this.state.errors.jobtitle && <p className="text-danger"> {this.state.errors.jobtitle.msg}</p>}              
          </div>
          <div className="col">
              <input type="password" onChange={this.changeHandler} name='password' className="form-control" value={this.state.data.password} placeholder="Password"/>
              {this.state.errors && this.state.errors.password && <p className="text-danger"> {this.state.errors.password.msg}</p>}
          </div>
        </div>
        <button type='submit' className="btn btn-primary">Submit</button>
      </form>
      </div>
    )
  }
}
