import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import API from '../../utils/API';

class Dashboard extends Component {
    state = {
      collapsed: true,
      redirectTo: '/'
    };
  
  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
    console.log("loggedin?",this.props.loggedIn)
    
  }

  logout = (event) => {
    event.preventDefault()
    console.log('logging out')
    API.employeeLogout().then(res => {
      console.log(res.data)
      if (res.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null,
          firstName: null,
          points: null
        })
      }
    }).catch(error => {
        console.log('Logout error', error)
    })
  }



  render() {
    console.log("props",this.props)
    if (this.props.loggedIn === false) {
        return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else if (this.props.loggedIn === null) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
        <div>
            <Navbar color="light" light>
            <NavbarBrand className="mr-auto">Welcome, {this.props.firstName} <br />Current Points: {this.props.points} </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
                <Nav navbar>
                <NavItem>
                    <NavLink href="/" onClick={this.logout}>Logout</NavLink>
                </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
        </div>
        );
    }
    }
}

export default Dashboard;
