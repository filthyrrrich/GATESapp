import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Form, FormGroup, Input, Label, Button, CardHeader, CardBody, } from 'reactstrap';
import API from '../../utils/API';
import './Signup.css'

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
    }

    handleFormSubmit = e => {
        e.preventDefault();
        API.employeeSignup(
                this.state.username, 
                this.state.password, 
                this.state.firstName, 
                this.state.lastName
            )
        .then((res) => {
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
            console.log('login error: ', error)
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
                            <h4 className="card-header">Employee Sign-up</h4>
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
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password" className="form-label">Password:</Label>
                                    <Input 
                                        value={this.password}
                                        onChange={this.handleInputChange}
                                        type="password" 
                                        name="password" 
                                    />
                                </FormGroup><hr />
                                <FormGroup>
                                    <Label for="firstName" className="form-label">First Name:</Label>
                                    <Input 
                                        value={this.firstName}
                                        onChange={this.handleInputChange}
                                        type="text" 
                                        name="firstName" 
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="lastName" className="form-label">Last Name:</Label>
                                    <Input 
                                        value={this.lastName}
                                        onChange={this.handleInputChange}
                                        type="text" 
                                        name="lastName" 
                                    />
                                </FormGroup>
                                <Button
                                    type="submit"
                                    onClick={this.handleFormSubmit}
                                    className="btn btn-success"
                                >
                                    Sign-up
                                </Button>
                                <a id="backToLogin"href="/">back to login</a>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            );
        }
    }
}
export default Signup;