import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Approve from '../../components/Approve';
import API from '../../utils/API';
import './Manager.css';

class Manager extends Component {
    state = {
      collapsed: true,
      employeeList: [],
      redirectTo: '/',
      employeeStatus: {}
    };
  
    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
        // console.log("loggedin?",this.props.loggedIn)
    }

    logout = e => {
        e.preventDefault()
        // console.log('logging out')
        API.employeeLogout()
            .then(res => {
                // console.log(res.data)
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

    refreshPage = () => {
        // console.log("Clicked");
        window.location.reload();
      }

    componentDidMount = () => {

        API.employeesScheduledToday()
        .then(res => {
            // console.log('EMPLOYEE LIST:::::==', res.data)
            if (res.status === 200) { 
                this.setState({
                    employeeList: res.data
                })
                // console.log("THIS STATE EMP LIST", this.state.employeeList)
            }
        })
        .catch(err => {
            console.log('Logout error', err)  
        })
        // console.log("_+_+_+_+_+_+__+_+_",this.state.employeeStatus)



        //Socket connection
        // this.socket = io(window.location.origin);
        this.props.socket.on('RECEIVE_MESSAGE', data => {
            // console.log(this.state)
            // console.log("DATA", data)


            //fix update here
            API.updateEmployeeStatus( data.dayID, data.message, data.reason, data.pending )
                .then(res => {
                    this.setState({
                        employeeStatus: res.data
                    })
                    // console.log("CURRENT EMPLOYEESTATUS STATE", this.state.employeeStatus)
                }) 
                .then(
                    API.employeesScheduledToday()
                        .then(res => {
                            // console.log('EMPLOYEE LIST:::::==', res.data)
                            if (res.status === 200) {
                                this.setState({
                                    employeeList: res.data,

                                })
                                // console.log("THIS STATE EMP LIST", this.state.employeeList)
                            }
                        })
                )
        })
        
        
    }

    render() {
     
            return (
            <div>
                <Navbar color="light" light>
                <NavbarBrand className="mr-auto">Welcome, {this.props.firstName} {this.props.lastName} <br />Supervisor </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar>
                    <NavItem>
                        <NavLink href="/" onClick={this.logout}>Logout</NavLink>
                        <NavLink href="/dashboard">My Schedule</NavLink>
                        <NavLink href="/manager">Today's Schedule</NavLink>
                    </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
                    
                <ListGroup className="mngList"><strong>Employee List</strong>
                    {this.state.employeeList.map(emp => ( emp.schedules.length>0 ?
                        <ListGroupItem color={this.state.collapsed ? "warning" : "none"} key={emp._id}>
                           {emp.firstName} {emp.lastName} {new Date(emp.schedules[0].date).toString().split("GMT")[0].slice(0,-4)}
                           {console.log("EMP-=-=-=-=", emp)}
                           <div id={emp._id}>{emp.schedules[0].status === null || emp.schedules[0].status === '' ? null : emp.schedules[0].confirmation===true ? "Confirmed: "+emp.schedules[0].status
                                :  <Approve 
                                        empID={emp._id}
                                        value={emp.schedules[0].status} 
                                        empPoints={emp.points} 
                                        reason={emp.schedules[0].reason} 
                                        id={emp.schedules[0]._id}
                                        refreshPage={this.refreshPage} 
                                        confirmed={emp.confirmation}      
                                    />}
                            </div>
                        </ListGroupItem> : null
                    ))}
                </ListGroup>
            </div>
            );
        }
    }


export default Manager;

