import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Form, FormGroup, Input, Label, Button, CardHeader, CardBody, } from 'reactstrap';

import API from '../../utils/API';
// import axios from 'axios';


class Login extends Component {
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
//look up javascript method to go to next page
    handleFormSubmit = e => {
        e.preventDefault();
        console.log("clicked working");
        console.log(this.state.username)
        API.employeeLogin(this.state.username, this.state.password, this.state.firstName, this.state.lastName)
            .then((res) => {
                console.log('login response: ')
                console.log(res)
                if (res.status === 200) {
                    // update App.js state for dashboard props
                    this.props.updateUser({
                        loggedIn: true,
                        username: res.data.username,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        points: res.data.points
                    })
                    // update the state to redirect to dash
                    this.setState({
                        redirectTo: '/dashboard'
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
                                        // id="password" 
                                        // placeholder="(YYYY)" 
                                    />
                                </FormGroup>

                                <Button
                                    type="submit"
                                    onClick={this.handleFormSubmit}
                                    className="btn btn-success">
                                    Login
                                </Button>
                                <br />
                                <br />
                                <p> Not a member yet? <a href='/signup'>Sign-up</a></p>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            );
        }
    }
}
export default Login;












// import React, { Component } from 'react';
// import Login from '../../components/Login';
// import API from '../../utils/API';
// // import axios from 'axios';


// class Home extends Component {
//     state = {
//         firstName: '',
//         lastName: '',
//         email: ''
        
//     };


//     handleInputChange = e => {
//         const { name, value } = e.target;
//         this.setState({
//         [name]: value
//         });
//         console.log(this.state)
//     }

//     handleFormSubmit = e => {
//         e.preventDefault();
//         console.log("clicked working");
//         console.log(this.state)
//         API.employeeLogin()
//             .then((res) => {
//                 // console.log(res)
//                 this.setState({ results: res.data.response.docs });
//                 console.log("this.state.results: ", this.state.results);
//             });

//     };

//     render() {
//         return (
//             <div>
//                 <Login 
//                 handleInputChange={this.handleInputChange}
//                 handleFormSubmit={this.handleFormSubmit}
//                 email={this.email}
//                 // query={this.query}
//                 // endYear={this.end}
//                 // startYear={this.start}
//                 />
                
//             </div>
//         );
//     }
// }

// export default Home;