import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EditAdminUser from "./EditAdminUser";

class UserItem extends Component {

    constructor(props) {
        super(props);

        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);

        this.state = {
            showEditModal: false
        };
    }

    showModal() {
        this.setState({
            showEditModal: true
        })
    }

    hideModal() {
        this.setState({
            showEditModal: false
        })
    }

    render() {
        return (
            <tr>
                <EditAdminUser showEditModal={this.state.showEditModal} onCloseModal={this.hideModal} user={this.props.userItem}/>
                <td>{this.props.userItem.name}</td>
                <td>{this.props.userItem.role}</td>
                <td>{this.props.userItem.email}</td>
                <td>{this.props.userItem.status}</td>
                <td>
                        <span className=" edit mx-2 text-primary" onClick={this.showModal} title={"Edit User"} style={{ cursor: "pointer" }}>
                            <i className="fa fa-pencil-square-o" ></i>
                        </span>


                </td>
                <td>
                        <span className=" dlt mx-2 text-danger" onClick={() => { this.props.deleteUser(this.props.userItem._id) }} onMouseOver="this.style.color='red'" title={"Delete User"} style={{ cursor: "pointer" }}>
                            <i className="fas fa-trash" ></i>
                        </span>
                </td>

            </tr>


        )
    }
}

export default UserItem