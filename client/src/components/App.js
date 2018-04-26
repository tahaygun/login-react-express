import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './JoinPage/Home';
import Main from './MainPage/Main';
import Userdetail from './MainPage/Userdetail';
class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/mainpage' component={Main} />
            <Route exact path='/user/:userId' component={Userdetail} />
          </Switch>
      </Router>
    );
  }
}

export default App;
