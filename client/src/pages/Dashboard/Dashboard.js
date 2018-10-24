import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import API from '../../utils/API';

class Dashboard extends Component {
    state = {
      collapsed: true,
      currentSchedule: [],
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
    API.employeeLogout()
        .then(res => {
            console.log(res.data)
            if (res.status === 200) {
                this.props.updateUser({
                loggedIn: false,
                username: null,
                firstName: null,
                lastName: null,
                points: null,
                phone: null,
                address: null,
                title: null,
                schedules: null,
                _id: null
                })
            }
        })
        .catch(error => {
            console.log('Logout error', error)
    })
  }

  componentDidMount = () => {
    if(this.props.loggedIn) {
        API.getEmployeeSchedule(this.props._id)
                .then(res => {
                    console.log('COMP DASH MOUNT:::::==', res)
                    if (res.status === 200 && this.props.loggedIn) {
                        this.setState({
                        currentSchedule: res.data[0].schedules
                        })
                    }
                })
                .catch(error => {
                    console.log('Logout error', error)
            })
    }
    
  }

  render() {
    console.log("props",this.props)
    console.log("CURRENT SCHEDULE", this.state.currentSchedule)
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
            <NavbarBrand className="mr-auto">Welcome, {this.props.firstName} {this.props.lastName} <br />Current Points: {this.props.points} </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
                <Nav navbar>
                <NavItem>
                    <NavLink href="/" onClick={this.logout}>Logout</NavLink>
                </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
                
                <ul> <strong>Upcoming Shifts</strong>
                    {this.state.currentSchedule.map(day => (
                        
                        <li key={day._id}>
                            {new Date(day.date).toString().split("GMT")[0].slice(0,-4)}
                            <button> Call Out</button>
                            <button>Late</button>
                            <button>Trade</button>
                        </li>
                    ))}
                </ul>
        </div>
        );
    }
    }
}

export default Dashboard;
