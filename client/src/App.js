import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Manager from "./pages/Manager";
import Admin from "./pages/Admin";
import API from "./utils/API";

class App extends Component {
 
  state = {
    loggedIn: null,
    username: null,
    firstName: null,
    lastName: null,
    points: null,
    phone: null,
    address: null,
    title: null,
    schedules: null,
    _id: null
  }

  componentDidMount = () => {
    API.employeeCheck()
      .then(res => {
            console.log('Get user response: ')
            console.log(res.data)
            if (res.data.user != null) {
              console.log('Get User: There is a user saved in the server session: ', res.data.user)
      
              this.setState({
                loggedIn: true,
                username: res.data.user.username,
                firstName: res.data.user.firstName,
                lastName: res.data.user.lastName,
                points: res.data.user.points,
                schedules: res.data.user.schedules,
                title: res.data.user.title,
                _id: res.data.user._id
              });
              console.log("name?", this.state)
            } else {
              console.log('Get user: no user');
              this.setState({
                loggedIn: false,
                username: null
              })
            }
          })
  }

  updateUser = (userObject) =>{
    this.setState(userObject)
  }

  render() {
       
    return (
      <div className="App">
   
        {/* Routes to different components */}
        <Route
          exact path="/"
          render={() =>
            <Login
              updateUser={this.updateUser}
            />}
        />

        <Route
          exact path="/signup"
          render={() =>
            <Signup
              loggedIn={this.state.loggedIn}
              updateUser={this.updateUser}
              />}
        />

        <Route
          exact path="/dashboard"
          render={ this.state.loggedIn ? () =>
            <Dashboard
              title={this.state.title}
              _id={this.state._id}
              schedules={this.state.schedules}
              points={this.state.points}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              loggedIn={this.state.loggedIn}
              updateUser={this.updateUser}
          /> : this.state.loggedIn === null ? () => <div>Loading...</div> : () => <Redirect to={{ pathname: "/" }} /> }
        />

        <Route
          exact path="/admin"
          render={ this.state.loggedIn && this.state.title==="Admin" ? () =>
            <Admin
              title={this.state.title}
              _id={this.state._id}
              schedules={this.state.schedules}
              points={this.state.points}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              loggedIn={this.state.loggedIn}
              updateUser={this.updateUser}
            /> : this.state.loggedIn === null ? () => <div>Loading...</div> : () => <Redirect to={{ pathname: "/" }} />}
        />
        
        <Route
          exact path="/manager"
          render={ this.state.loggedIn && this.state.title==="Manager" ? () =>
            <Manager
              title={this.state.title}
              _id={this.state._id}
              schedules={this.state.schedules}
              points={this.state.points}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              loggedIn={this.state.loggedIn}
              updateUser={this.updateUser}
            /> : this.state.loggedIn === null ? () => <div>Loading...</div> : () => <Redirect to={{ pathname: "/" }} />}
        />
        
      </div>
    );
  }
}

export default App;
