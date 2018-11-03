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
        schedules: [],
        updating: {}
    }
    

    toggleDropdown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
        // console.log("STATE", this.state)
    }

    toggleModal = () => {
        this.setState({
          modal: !this.state.modal,
        //   session: null
        });
        // console.log("STATE UPDATING",this.state.updating)
      }
    
    editEmployeeSchedule = (updatedSchedule) => {
        API.adminUpdateEmployeeSchedule(updatedSchedule)
            .then(res => {
                console.log(res)
                // window.location.reload();
            })
            .catch(error => {
                console.log('Logout error', error)
            })
    }

    editEmployeeInfo = (updatedInfo) => {
        API.adminUpdateEmployee(updatedInfo)
            .then(res => {
                console.log(res)
                // window.location.reload();
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

                const addDate = document.getElementById("date"+ e.target.name).value;
                const addTime = document.getElementById("time"+ e.target.name).value;
                // console.log("CO")
                this.addSchedule({
                    _id: e.target.id,
                    date: addDate,
                    time: addTime
                })
                break;

            case "Employee Info":

                let fName = document.getElementById("fName").value;
                let lName = document.getElementById("lName").value;
                let title = document.getElementById("title").value;
                let points = document.getElementById("points").value;
                // console.log(this.state.selected)
                this.editEmployeeInfo({
                    id: this.props.id,
                    fName: fName,
                    lName: lName,
                    title: title,
                    points: points
                })
                break;

            case "Current Schedule":
                
                const newConfirm = document.getElementById("confirm"+ e.target.name).value;
                const newStatus = document.getElementById("status"+ e.target.name).value;
                const newPending = document.getElementById("pending"+ e.target.name).value;
                const newReason =  document.getElementById("reason"+ e.target.name).value;
                const newDate = document.getElementById("date"+ e.target.name).value;
                const newTime = document.getElementById("time"+ e.target.name).value;

                this.editEmployeeSchedule({
                    id: e.target.id,
                    confirm: newConfirm,
                    status: newStatus,
                    pending: newPending,
                    reason: newReason,
                    date: newDate,
                    time: newTime
                })
                break;
        
            default:
                break;
        }
        this.toggleModal()
    }

    newSchedule = () => {
        // console.log("new schedule clicked");
        this.setState({
            modal: !this.state.modal,
            selected:  "New Schedule"
        }); 
    }

    employeeInfo = () => {
        // console.log();
        API.adminGetEmployee(this.props.id)
            .then(res => {
                // console.log(res)
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

    currentSchedule = () => {
        
        // console.log("ID IS",this.props.id)
        API.getEmployeeSchedule(this.props.id)
            .then( res => {
                // console.log("current schedules", res.data);
                this.setState({
                    modal: !this.state.modal,
                    selected:  "Current Schedule",
                    schedules: res.data.schedules
                });
            })
        // console.log("current schedule clicked", this.props.id);
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
                                <p>Date: <br /><input id="date" type="date" placeholder="(YYYY-MM-DD)"/><br /></p>
                                <p>Time: <br /><input id="time" type="time" placeholder="(HH:MM:SS)"/><br /><br /></p>
                            </div>
                        : 
                        this.state.selected === "Current Schedule" ? 
                        this.state.schedules.map((day,i)  => (
                            <div key={day._id}>
                                <Button name={i} className="collapsible" id={"ID"+ day._id} style={{ marginBottom: '1rem' }}>{new Date(day.date).toString().split("GMT")[0].slice(0,-4)}</Button>
                                <UncontrolledCollapse toggler={"ID"+ day._id}>
                                    <Card>
                                        <CardBody>
                                            <p>Status: <br />
                                                <select defaultValue={day.status ==="Late" ? "Late" : day.status ==="Call Out" ? "Call Out" : day.status ==="Trade Shift" ? "Trade Shift" : null} id={"status"+i}>
                                                    <option  id={"none"+i} value='' >None</option>
                                                    <option  id={"late"+i} value="Late">Late</option> 
                                                    <option  id={"callOut"+i} value="Call Out">Call Out</option>
                                                    <option  id={"trade"+i} value="Trade Shift">Trade Shift</option>
                                                </select>
                                            </p> 
                                            <p>Confirmed:<br />
                                                <select id={"confirm"+i} defaultValue={day.confirmation ? true : false}>
                                                    <option  value={true}>True</option> 
                                                    <option  value={false}>False</option>
                                                </select> 
                                            </p>
                                            <p>Pending:<br />
                                                <select id={"pending"+i} defaultValue={day.pending ? true : false}>
                                                    <option  id={"pT"+i} value={true}>True</option> 
                                                    <option  id={"pF"+i} value={false}>False</option>
                                                </select>
                                            </p>
                                            <p>Reason:<br /><input id={"reason"+ i} defaultValue={day.reason}/><br /></p>
                                            <p>Date: <br /><input id={"date"+ i} type="date" defaultValue={day.date.toString().split("T")[0]}/><br /></p>
                                            <p>Time: <br /><input id={"time"+ i} type="time" defaultValue={new Date(day.date).toString().split(" ")[4].trim()}/><br /><br /></p>
                                            <Button id={day._id} name={i} color="primary" onClick={this.handleModalSubmit}>Submit</Button>
                                        </CardBody>
                                    </Card>
                                </UncontrolledCollapse>
                            </div>)) 
                        : null}
                         
                    </ModalBody>
                    <ModalFooter>
                        {this.state.selected === "New Schedule" || this.state.selected === "Employee Info" ? 
                            <Button id={this.props.id} color="primary" onClick={this.handleModalSubmit}>Submit</Button>
                        : null}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default Edit;