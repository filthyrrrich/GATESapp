import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Form, FormGroup, Input, Label, Button, CardHeader, CardBody, } from 'reactstrap';
import API from '../../utils/API';
import  "./Login.css";

class Login extends Component {
    state = {
        username: null,
        password: null,
        firstName: null,
        lastName: null,
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
        // console.log("clicked working");
        // console.log(this.state.username)
        API.employeeLogin(
                this.state.username, 
                this.state.password, 
                this.state.firstName, 
                this.state.lastName
            )
            .then((res) => {
                // console.log('login response: ')
                // console.log(res)
                if (res.status === 200) {
                    // update App.js state for dashboard props
                    this.props.updateUser({
                        loggedIn: true,
                        username: res.data.username,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        points: res.data.points,
                        _id: res.data._id,
                        schedules: res.data.schedules,
                        title: res.data.title
                    })

                    // update the state to redirect to dash/mng/adm
                    switch (res.data.title) {
                        case "Employee":
                            this.setState({
                                redirectTo: '/dashboard'
                            })
                            break;
                        case "Manager":
                            this.setState({
                                redirectTo: '/manager'
                            })
                            break;
                        case "Admin":
                            this.setState({
                                redirectTo: '/admin'
                            })
                            break;
                
                        default:
                            break;
                    }
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
                <div className='container testing'>
                    <Card className="login-form" id="login-form">
                        <CardHeader>
                            <h1 className="card-header">GATES</h1>
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
                                </FormGroup>
                                <Button
                                    type="submit"
                                    onClick={this.handleFormSubmit}
                                    className="btn btn-success">
                                    Login
                                </Button>
                                <p id="toSignup"> Not a member yet? <a href='/signup'>Sign-up</a></p><hr />
                                <p className="llc">2018 Freeroll, LLC</p>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            );
        }
    }
}
export default Login;
