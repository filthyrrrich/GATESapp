import React, { Component } from 'react';
import Edit from '../../components/Edit';
import { Table, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import API from '../../utils/API';
import './Admin.css';



class Admin extends Component {
    state = {
        collapsed: true,
        employeesList: [],
        redirectTo: '/'
    };
  

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

    // addSchedule = (schedule) => {
    //         // take in clicked employees ID
    //         // console.log("ADD SCHEDULE CLICKED",e.target.id )
    //     API.writeNewSchedule(schedule)
    //         .then(res => {

    //         })
    //         .catch(error => {
    //             console.log('Logout error', error)
    //     })
    // }

//     editEmployee = () => {
//         // take in clicked employees ID
//     API.updateEmployee()
//         .then(res => {

//         })
//         .catch(error => {
//             console.log('Logout error', error)
//     })
// }


    componentDidMount = () => {

        // get all employees to display in table
        API.adminAllEmployees()
            .then (res => {
                if (res.status === 200) {
                    this.setState({
                        employeesList: res.data
                    })
                }
                
            })
            .catch(error => {
                console.log('Logout error', error)
            })
                  
    }

    render() {
        console.log("EMPLOYEE LIST STATE",this.state.employeesList)
        // console.log("CURRENT SCHEDULE", this.state.currentSchedule)
       
            return (
            <div>
                <Navbar color="light" light>
                <NavbarBrand className="mr-auto">Welcome, {this.props.firstName} {this.props.lastName} <br />Admin </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar>
                    <NavItem>
                        <NavLink href="/" onClick={this.logout}>Logout</NavLink>
                        <NavLink href="/dashboard">My Schedule</NavLink>
                    </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
                <div className="container">  
                <h1>Employee Roster</h1> 
                <Table hover bordered>
                    <thead>
                    <tr>
                        <th>Points</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Title</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.employeesList.map(emp => (
                            <tr key={emp._id} bgcolor={emp.points >= 10 ? "#f59292" :  emp.points >= 7 ? "#f5d292": emp.points >= 5 ? "#f3f592" : null}>
                            <th scope="row">{emp.points}</th>
                            <td>{emp.lastName}</td>
                            <td>{emp.firstName}</td>
                            <td>{emp.title}</td>
                            <td><Edit 
                                    id={emp._id}
                                    fullName={emp.firstName+" "+emp.lastName} 
                                />
                            </td>

                        </tr>
                        ))}
                    </tbody>
                </Table>
                </div> 





                {/* <ListGroup><strong>Upcoming Shifts</strong>
                    {this.state.currentSchedule.map(day => (
                        
                        <ListGroupItem color={this.state.collapsed ? "warning" : "none"} key={day._id}>
                            {new Date(day.date).toString().split("GMT")[0].slice(0,-4)}
                        <Action 
                            id={day._id} 
                            employeeID={this.props._id} 
                            socket={this.socket}
                            firstName={this.props.firstName}
                            lastName={this.props.lastName}
                            confirm={day.confirmation}
                            status={day.status}
                        />
                        </ListGroupItem>
                    ))}
                </ListGroup> */}
            </div>
            );
        }
        // }
}

export default Admin;

