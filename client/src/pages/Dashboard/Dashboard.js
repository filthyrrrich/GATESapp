import React, { Component } from 'react';
import Action from '../../components/Action/Action';
import { ListGroup, ListGroupItem, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import API from '../../utils/API';
import './Dashboard.css';
// import io from "socket.io-client/dist/socket.io";


class Dashboard extends Component {
    state = {
        collapsed: true,
        currentSchedule: [],
        redirectTo: '/'
    };
  
    // socket = io(window.location.origin);

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
        console.log("loggedin?",this.props.loggedIn)
    }

    logout = e => {
        e.preventDefault()
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
//    const socket = io('localhost:3030');


    API.getEmployeeSchedule(this.props._id)
        .then(res => {
            console.log('COMP DASH MOUNT:::::==', res)
            //possibly add if logged in back here
            if (res.status === 200) {
                this.setState({
                currentSchedule: res.data.schedules
                })
            }
        })
        .catch(error => {
            console.log('Logout error', error)
        })
  }

    render() {
        console.log("props",this.props)
        console.log("CURRENT SCHEDULE", this.state.currentSchedule)
       
            return (
            <div>
                <Navbar color="light" light>
                <NavbarBrand className="mr-auto">Welcome, {this.props.firstName} {this.props.lastName} <br />Current Points: {this.props.points} </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar>
                    <NavItem>
                        <NavLink href="/" onClick={this.logout}>Logout</NavLink>
                        {this.props.title === "Manager" ? <NavLink href="/dashboard">My Schedule</NavLink> : null}
                        {this.props.title === "Manager" ? <NavLink href="/manager">Manager Schedule</NavLink> : null}
                    </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
                    
                <ListGroup><strong>Upcoming Shifts</strong>
                    {this.state.currentSchedule.map(day => (
                        
                        <ListGroupItem color={this.state.collapsed ? "warning" : "none"} key={day._id}>
                            {new Date(day.date).toString().split("GMT")[0].slice(0,-4)}
                        
                        <Action 
                            id={day._id} 
                            employeeID={this.props._id} 
                            socket={this.props.socket}
                            firstName={this.props.firstName}
                            lastName={this.props.lastName}
                            confirm={day.confirmation}
                            status={day.status}
                            // pending={day.pending}
                        />
                
                    
                        
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
            );
        }
        // }
}

export default Dashboard;


