import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Action.css';
import API from '../../utils/API';

class Action extends Component {
    state = {
        dropdownOpen: false,
        modal: false,
        session: null
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
          session: null
        });
        console.log(this.state)
      }

    sendMessage = () => {
        this.props.socket.emit('SEND_MESSAGE', {
            employee: this.props.firstName +" "+ this.props.lastName,
            message: this.state.session,
            empID: this.props.employeeID,
            dayID: this.props.id,
            reason: document.getElementById('reason').value,
            pending: true
        });
    }

    componentDidMount = () => {
        console.log("PROPS", this.props)
        // console.log("PROPS{}{}{}{}{}{}{", this.props)
        API.getEmployeeSchedule(this.props.employeeID)
        .then(res => {
            res.data[0].schedules.map(day =>{
                // console.log("DAY",day)
                if(day.pending && document.getElementById(day._id)) {
                     return document.getElementById(day._id).innerHTML = 'Request Pending: ' + day.status;
                } else {
                    return null
                }})
        })
        .catch(error => {
            console.log('Logout error', error)
        })
    }

    handleModalSubmit = e => {
        e.preventDefault();
        //reason input
        console.log(document.getElementById('reason').value);
        console.log(`YOUR ${this.state.session } REQUEST HAS BEEN SUBMITTED for:`, this.props.id);
    
        this.setState({
            modal: !this.state.modal
          })
          this.sendMessage()
          console.log(this.state);
        //   this.props.socket.emit('SEND_MESSAGE', {
        //     // log the user 
        //     // log users request
        //     employee: this.props.firstName +" "+ this.props.lastName,
        //     message: this.state.session,
        //     empID: this.props.employeeID,
        //     dayID: this.props.id,
        //     reason: document.getElementById('reason').value,
        //     pending: true
        // });
        document.getElementById(this.props.id).innerHTML =  'Request Pending: ' + this.state.session; 
    }

    lateClick = () => {
        //send call to toggle late and notify managers
        console.log("LATE Selected for:",this.props.id);
        this.setState({
            modal: !this.state.modal,
            session:  "Late"
        }); 
    }

    tradeClick = () => {
        //send call to offer this shift up for grabs
        console.log("TRADE Selected for:",this.props.id);
        this.setState({
            modal: !this.state.modal,
            session:  "Trade Shift"
        });
    }

    callOutClick = () => {
        //send call to access schedule for this day and change confirm to called out
        // adjust points by +1
        console.log("CALL OUT Selected for:",this.props.id);
        this.setState({
            modal: !this.state.modal,
            session:  "Call Out"
        });
        console.log(this.props.employeeID)
    }

    render() {
        return (
            <div>
                {this.props.confirm && this.props.status ? "Confirmed: "+ this.props.status:
                <ButtonDropdown id={this.props.id} isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle caret>Action</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Notify for:</DropdownItem>
                        <DropdownItem onClick={this.lateClick}>Late</DropdownItem>
                        <DropdownItem onClick={this.tradeClick}>Trade Shift</DropdownItem>   
                        <DropdownItem divider />
                        <DropdownItem onClick={this.callOutClick}>Call Out</DropdownItem>
                    </DropdownMenu> 
                </ButtonDropdown>}

                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>{this.state.session}</ModalHeader>
                    <ModalBody>
                        Notes:<br />
                        <textarea id='reason' placeholder="(explain your reason)"></textarea>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleModalSubmit}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default Action;



















// import React, { Component } from 'react';
// import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import './Action.css';
// import ModalAction from '../Modal/Modal';

// class Action extends Component {
//     state = {
//         dropdownOpen: false
//     }
  
//     toggle = () => {
//         this.setState({
//             dropdownOpen: !this.state.dropdownOpen
//         });
//     }

//     lateClick = () => {
//         //send call to toggle late and notify managers
//         console.log("LATE Selected for:",this.props.id);
        
//     }

//     tradeClick = () => {
//         //send call to offer this shift up for grabs
//         console.log("TRADE Selected for:",this.props.id);
//     }

//     callOutClick = () => {
//         //send call to access schedule for this day and change confrim to called out
//         // adjust points by +1
//         console.log("CALL OUT Selected for:",this.props.id);
//     }

//     render() {
//         return (
//         <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//             <DropdownToggle caret>
//             Action
//             </DropdownToggle>
//             <DropdownMenu>
//                 <DropdownItem header>Notify for:</DropdownItem>
//                 <DropdownItem onClick={this.lateClick}>Late</DropdownItem>
//                 <DropdownItem onClick={this.tradeClick}>Trade Shift</DropdownItem>
//                 <DropdownItem divider />
//                 <DropdownItem onClick={this.callOutClick}>Call Out</DropdownItem>
//             </DropdownMenu>
//         </ButtonDropdown>
//         );
//     }
// }
// export default Action;