import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Form, FormGroup, Input, Label, Button, CardHeader, CardBody, } from 'reactstrap';
import API from '../../utils/API';
// import axios from 'axios';


class Signup extends Component {
    state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        redirectTo: null

        
    };


    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
        [name]: value
        });
        // console.log(this.state)
    }

    handleFormSubmit = e => {
        e.preventDefault();
        console.log("clicked working");
        console.log(this.state)
         
        API.employeeSignup(this.state.username, this.state.password, this.state.firstName, this.state.lastName)
        .then((res) => {
            console.log('login response: ')
            console.log(res)
            if (res.status === 200) {
                // update App.js state
                this.props.updateUser({
                    loggedIn: true,
                    username: res.data.username,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName
                })
                // update the state to redirect to home
                this.setState({
                    redirectTo: '/'
                })
            }
        }).catch(error => {
            console.log('login error: ')
            console.log(error);
            
        });

    };

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
        return (
            <div className='container'>
                <Card className="login-form" id="login-form">
                    
                    <CardHeader>
                        <h1 className="card-header">GATES Sign Up</h1>
                    </CardHeader>

                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="username" className="form-label">Username:</Label>
                                <Input 
                                    value={this.username}
                                    onChange={this.handleInputChange}
                                    type="text" 
                                    name="username" 
                                    // id="username" 
                                    // placeholder="(YYYY)" 
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password" className="form-label">Password:</Label>
                                <Input 
                                    value={this.password}
                                    onChange={this.handleInputChange}
                                    type="password" 
                                    name="password" 
                                    // id="pass" 
                                    // placeholder="(YYYY)" 
                                />
                            </FormGroup>
                            <hr />
                            <FormGroup>
                                <Label for="firstName" className="form-label">First Name:</Label>
                                <Input 
                                    value={this.firstName}
                                    onChange={this.handleInputChange}
                                    type="text" 
                                    name="firstName" 
                                    // id="pass" 
                                    // placeholder="(YYYY)" 
                                />
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="lastName" className="form-label">Last Name:</Label>
                                <Input 
                                    value={this.lastName}
                                    onChange={this.handleInputChange}
                                    type="text" 
                                    name="lastName" 
                                    // id="pass" 
                                    // placeholder="(YYYY)" 
                                />
                            </FormGroup>

                            <Button
                                type="submit"
                                onClick={this.handleFormSubmit}
                                className="btn btn-success">
                                Sign-up
                            </Button>
                            
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
}
export default Signup;