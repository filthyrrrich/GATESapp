import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, UncontrolledCollapse } from 'reactstrap';
import './Edit.css';
import API from '../../utils/API';

class Edit extends Component {
    state = {
        dropdownOpen: false,
        modal: false,
        // listCollapse: false,
        selected: null,
        employee: {},
        schedules: []
    }
    

    toggleDropdown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
        console.log("STATE", this.state)
    }

    toggleModal = () => {
        this.setState({
          modal: !this.state.modal,
        //   session: null
        });
        console.log(this.state)
      }
    
    editEmployeeSchedule = (updatedSchedule) => {
        API.adminUpdateEmployeeSchedule(updatedSchedule)
            .then(res => {
                console.log(res)
                window.location.reload();
            })
            .catch(error => {
                console.log('Logout error', error)
            })
    }

    editEmployeeInfo = (updatedInfo) => {
        API.adminUpdateEmployee(updatedInfo)
            .then(res => {
                console.log(res)
                window.location.reload();
            })
            .catch(error => {
                console.log('Logout error', error)
            })
    }

    addSchedule = (schedule) => {
        
        API.writeNewSchedule(schedule)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log('Logout error', error)
        })
}
    handleModalSubmit = e => {
        e.preventDefault();
    
        switch (this.state.selected) {
            case "New Schedule":

                let year = document.getElementById("year").value;
                let month = document.getElementById("month").value -1;
                let day = document.getElementById("day").value;
                let time = document.getElementById("time").value;
            
                this.addSchedule({
                    _id: e.target.id,
                    date: new Date(year, month, day, time)
                })
                break;

            case "Employee Info":

                let fName = document.getElementById("fName").value;
                let lName = document.getElementById("lName").value;
                let title = document.getElementById("title").value;
                let points = document.getElementById("points").value;
                console.log(this.state.selected)
                this.editEmployeeInfo({
                    id: this.props.id,
                    fName: fName,
                    lName: lName,
                    title: title,
                    points: points
                })
                break;

            case "Current Schedule":

                let confirm = document.getElementById("confirm").value;
                let status = document.getElementById("status").value;
                let pending = document.getElementById("pending").value;
                let reason = document.getElementById("reason").value;
                console.log(this.state.schedules)
                this.editEmployeeSchedule({
                    id: this.props.id,
                    confirm: confirm,
                    status: status,
                    pending: pending,
                    reason: reason
                })
                break;
        
            default:
                break;
        }
        this.toggleModal()
    }

    newSchedule = () => {
        console.log("new schedule clicked");
        this.setState({
            modal: !this.state.modal,
            selected:  "New Schedule"
        }); 
    }

    employeeInfo = () => {
        console.log();
        API.adminGetEmployee(this.props.id)
            .then(res => {
                console.log(res)
               this.setState({
                    modal: !this.state.modal,
                    selected:  "Employee Info",
                    employee: {
                        fName: res.data.firstName,
                        lName: res.data.lastName,
                        title: res.data.title,
                        points: res.data.points
                    }
                }); 
            })
        
    }

    displaySchedule = () => {
       
    }

    currentSchedule = () => {
        
        console.log("ID IS",this.props.id)
        API.getEmployeeSchedule(this.props.id)
            .then( res => {
                console.log("current schedules", res.data);
                this.setState({
                    modal: !this.state.modal,
                    selected:  "Current Schedule",
                    schedules: res.data.schedules
                });
            })
        console.log("current schedule clicked", this.props.id);
        

        
        // console.log(this.props.employeeID)
    }

    render() {
        return (
            <div>
                
                <ButtonDropdown size="sm" id={this.props.id} isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle caret>Edit</DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem header>Adjust</DropdownItem>
                        <DropdownItem onClick={this.employeeInfo}>Employee Info</DropdownItem>
                        <DropdownItem onClick={this.currentSchedule}>Current Schedule</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem header>Add</DropdownItem>
                        <DropdownItem onClick={this.newSchedule}>New Schedule</DropdownItem>   
                    </DropdownMenu> 
                </ButtonDropdown>

                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>{this.state.selected} For: <br />{this.props.fullName}</ModalHeader>
                    <ModalBody>
                        {this.state.selected === "Employee Info" ? 
                        <div>
                            <p>First Name:<br /><input type="text" id="fName" defaultValue={this.state.employee.fName}/><br /></p>
                            <p>Last Name:<br /><input type="text" id="lName" defaultValue={this.state.employee.lName}/><br /></p>
                            <p>Title:<br /><input type="text" id="title" defaultValue={this.state.employee.title}/><br /></p>
                            <p>Points:<br /><input type="text" id="points" defaultValue={this.state.employee.points}/><br /></p>
                        </div>
                        : 
                        this.state.selected === "New Schedule" ? 
                        <div>
                            <input id="year" placeholder="(year)"/><br />
                            <input id="month" placeholder="(month)"/><br />
                            <input id="day" placeholder="(day)"/><br />
                            <input id="time" placeholder="(in-time)"/>
                        </div>
                        : 
                        this.state.schedules.map(day => (

                            <div key={day._id}>
                                <Button  className="collapsible" id={"ID"+ day._id} style={{ marginBottom: '1rem' }}>{new Date(day.date).toString().split("GMT")[0].slice(0,-4)}</Button>
                                <UncontrolledCollapse toggler={"ID"+ day._id}>
                                    <Card>
                                        <CardBody>
                                        <p>Confirmation:<br /><input id="confirm" defaultValue={day.confirmation}/><br /></p>
                                        <p>Status:<br /><input id="status" defaultValue={day.status}/><br /></p>
                                        <p>Pending:<br /><input id="pending" defaultValue={day.pending}/><br /></p>
                                        <p>Reason:<br /><input id="reason" defaultValue={day.reason}/><br /></p>
                                        <input id="year" placeholder="(year)"/><br />
                                        <input id="month" placeholder="(month)"/><br />
                                        <input id="day" placeholder="(day)"/><br />
                                        <input id="time" placeholder="(in-time)"/>
                                        </CardBody>
                                    </Card>
                                    </UncontrolledCollapse>

                                {/* <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
      Toggle
    </Button>
    <UncontrolledCollapse toggler="#toggler">
      <Card>
        <CardBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
          similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
          dignissimos esse fuga! Minus, alias.
        </CardBody>
      </Card>
    </UncontrolledCollapse> */}
                            </div>





                            // <div key={day._id}> 
                            //     <button className="collapsible" onClick={this.displaySchedule}>Open Section 1</button>
                            //     <div className="content">
                            //         <input id="year" placeholder="(year)"/><br />
                            //         <input id="month" placeholder="(month)"/><br />
                            //         <input id="day" placeholder="(day)"/><br />
                            //         <input id="time" placeholder="(in-time)"/>
                            //     </div>
                            // </div>
                        ))}
                         




                     
                     
                        
                        
                       
                    </ModalBody>
                    <ModalFooter>
                        <Button id={this.props.id} color="primary" onClick={this.handleModalSubmit}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default Edit;