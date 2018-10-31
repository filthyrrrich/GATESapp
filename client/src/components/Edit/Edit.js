import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Edit.css';
import API from '../../utils/API';

class Edit extends Component {
    state = {
        dropdownOpen: false,
        modal: false,
        selected: null
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


    addSchedule = (schedule) => {
        // take in clicked employees ID
        // console.log("ADD SCHEDULE CLICKED",e.target.id )
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
        
        let year = document.getElementById("year").value;
        let month = document.getElementById("month").value -1;
        let day = document.getElementById("day").value;
        let time = document.getElementById("time").value;
        // console.log(new Date(document.getElementById("year").value, document.getElementById("month").value -1, document.getElementById("day").value, document.getElementById("time").value))
        switch (this.state.selected) {
            case "New Schedule":
                console.log(this.state.selected)
                this.addSchedule({
                    _id: e.target.id,
                    date: new Date(year, month, day, time)
                })
                break;
            case "Employee Info":
                console.log(this.state.selected)
                break;
            case "Current Schedule":
                console.log(this.state.selected)
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
        console.log("employee info clicked");
        this.setState({
            modal: !this.state.modal,
            selected:  "Employee Info"
        });
    }

    currentSchedule = () => {
        console.log("current schedule clicked");
        this.setState({
            modal: !this.state.modal,
            selected:  "Current Schedule"
        });
        // console.log(this.props.employeeID)
    }

    render() {
        return (
            <div>
                
                <ButtonDropdown id={this.props.id} isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle caret>Edit</DropdownToggle>
                    <DropdownMenu>
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
                        {this.state.selected === "Employee Info" ? "Employee Info": 
                        this.state.selected === "New Schedule" ? 
                        <div>
                        <input id="year" placeholder="(year)"/><br />
                        <input id="month" placeholder="(month)"/><br />
                        <input id="day" placeholder="(day)"/><br />
                        <input id="time" placeholder="(in-time)"/>

                        {/* <select name="time"> 
                            <option value="00:00">00:00</option>
                            <option value="01:00">01:00</option>
                            <option value="02:00">02:00</option>
                            <option value="03:00">03:00</option>
                            <option value="04:00">04:00</option>
                            <option value="05:00">05:00</option>
                            <option value="06:00">06:00</option>
                            <option value="07:00">07:00</option>
                            <option value="08:00">08:00</option>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                            <option value="23:00">23:00</option>
                        </select>  */}
                        </div>
                        : 
                        "Current Schedule"}
                         




                     {/* {Array(23).fill("00:00", 0, 23).map((time, i) => (
                         
                        <option value="00:00">00:00</option>
                     ))} */}
                     
                        
                        
                       
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