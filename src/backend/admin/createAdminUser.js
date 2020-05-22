import React, { Component } from 'react';
import axios from 'axios';
import "../CSS/createAdminUser.css"

import AllAdminUsers from "./AllAdminUsers";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
class CreateAdminUser extends Component {
    constructor(props) {
        super(props);

        this.onchangeName = this.onchangeName.bind(this);
        this.onchangeEmail = this.onchangeEmail.bind(this);
        this.onchangeRole = this.onchangeRole.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.handleShowAdd = this.handleShowAdd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            role: 'admin',
            error:'',
            isError:false,
        }

    }

    // componentDidMount() {
    //     setInterval(this.setError,5000)
    // }

    // setError = () => {
    //     this.setState({
    //         isError:false
    //     })
    // }
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

    onchangeRole(e) {
        this.setState({ role: e.target.value });
    }

    handleCloseAdd(){
        this.setState({
            show:false

        })

    }
    handleShowAdd(){
        this.setState({
            show:true
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            role: this.state.role,
        }


        this.setState(
            {
                name: '',
                email: '',
                role: 'admin',
            }
        )


        axios.post('http://localhost:5000/createAdminUser/add'
            , newUser).then(res => {

            console.log(res.data)
            console.log(res.data.msg)
            this.setState({
                error: res.data.msg,
                isError:true
            })
            this.handleShowAdd()
        });
    }



    render() {
        return (

            <div className="first">

                <br /><br />
                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6 pb-5">

                            <form onSubmit={this.onSubmit}>
                                <div className="card  rounded">

                                    <div className="card-header rounded p-0">
                                        <div className="bg-info text-white text-center py-2">
                                            <h3><i className="fa fa-user-plus"></i> Create Admin User Accounts</h3>

                                        </div>
                                    </div>
                                    <div className="card-body rounded p-3">


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

                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><i
                                                        className="fa fa-users-cog text-info"></i></div>
                                                </div>
                                                <select id="role-selector" value={this.state.role} onChange={this.onchangeRole}>
                                                    <option value="storemanager">Store Manager</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <input type="submit" value="Submit" className="btn btn-info btn-block rounded py-2"></input>
                                        </div>
                                    </div>

                                </div>
                            </form>

                            <Modal show={this.state.show} onHide={this.handleCloseAdd}>
                                <Modal.Header closeButton>
                                    <h6>{this.state.error}</h6>
                                </Modal.Header>

                            </Modal>

                        </div>
                    </div>
                </div>
                <br />



                <AllAdminUsers></AllAdminUsers>
            </div>

        );
    }
}

export default CreateAdminUser;