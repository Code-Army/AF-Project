import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Modal, Button } from 'react-bootstrap';

class EditAdminUser extends Component {
    constructor(props) {
        super(props);

        this.onchangeName = this.onchangeName.bind(this);
        this.onchangeEmail = this.onchangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.state = {
            name: '',
            email: '',


        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/createAdminUser/' + this.props.user._id)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    email: res.data.email,

                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onchangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onchangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const User = {
            name: this.state.name,
            email: this.state.email
        }
        console.log(this.state.name)
        console.log(this.state.email)

        axios.put('http://localhost:5000/createAdminUser/' + this.props.user._id, User)
            .then(res => console.log(res.data));

        window.location = '/admin';
    }

    handleCloseModal() {
        this.props.onCloseModal();
    }


    render() {
        return (
            <Modal size="md" show={this.props.showEditModal} onHide={this.handleCloseModal}>
                <Modal.Header closeButton>
                    <h3>Edit User {this.state.name}</h3>
                </Modal.Header>
                <Modal.Body><div className="first">

                    <div className="container">

                        <div >
                            <div >

                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i
                                                    className="fa fa-user text-info"></i></div>
                                            </div>
                                            <input type="text" className="form-control" id="name" name="username" value={this.state.name} onChange={this.onchangeName}
                                                   placeholder="Enter Name" required></input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i
                                                    className="fa fa-envelope text-info"></i></div>
                                            </div>
                                            <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.onchangeEmail}
                                                   placeholder="Enter the email" required></input>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <input type="submit" value="Edit" className="btn btn-info btn-block rounded py-2"></input>
                                    </div>
                                </form>



                            </div>
                        </div>
                    </div>
                </div>
                </Modal.Body>
            </Modal>

        );
    }
}

export default EditAdminUser;