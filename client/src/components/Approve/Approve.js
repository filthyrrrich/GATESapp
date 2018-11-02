import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './Approve.css';
import API from '../../utils/API';

class Approve extends Component {
    state = {
        dropdownOpen: false
    }
  
    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    approveClick = () => {
        //send call to offer this shift up for grabs
        console.log("CONFIRMED for:",this.props.id);
        API.confirmEmployeeRequest(this.props.id)
            .then(res => {
                console.log("CONFIRMD DATA",res.data)
                console.log("children=========================",this.props.id)
                API.updateEmployeePoints(this.props.empID, this.props.empPoints, this.props.value)
                    .then(
                        document.getElementById(this.props.empID).innerHTML = "Confirmed: "+ res.data.status,
                        console.log("UPDATED POINTS DATA:+:+:+:+:+:+:+:+:", res.data),
                        this.props.refreshPage()
                    )
            })
    }

    // denyClick = () => {
    //     //send call to access schedule for this day and change confrim to called out
    //     // adjust points by +1
    //     console.log("CALL OUT Selected for:",this.props.id);
    // }

    render() {
        return (
        this.props.confirmed === true ? "Confirmed" + this.props.value :
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            Request: {this.props.value}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={this.approveClick}>Confirm {this.props.value}<br /> <p className='reasonText'> Reason: {this.props.reason}</p> </DropdownItem>
            </DropdownMenu>
        </ButtonDropdown>
        );
    }
}
export default Approve;