import React, {Component} from 'react';

import axios from 'axios';
import UserItem from "./AdminUserItem";
import Modal from "react-bootstrap/Modal";

class AllAdminUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[],
            message:'fail to delete the user',
            isMessage:false,
            show:false
        }

        this.deleteUser = this.deleteUser.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

    }
    componentDidMount() {
        setInterval(this.getData,2000)


    }



    getData = () => {
        axios.get('http://localhost:5000/createAdminUser/').then(res =>{
            this.setState({users:res.data});

        })
            .catch((err) => {
                console.log(err);
            })
    }

    handleClose(){
        this.setState({
            show:false

        })

    }
    handleShow(){
        this.setState({
            show:true
        })
    }

    deleteUser(id){
        axios.delete('http://localhost:5000/createAdminUser/'+id)
            .then(res => {
                console.log(res.data)
                console.log(res.data)
                this.handleShow()
                this.setState(
                    {
                        message:res.data.msg,
                        isMessage:true
                    }
                )

            });
        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }


    render() {
        return (
            <div className="container">

                <div className="table-responsive-md">
                    <table className="table table-hover" >

                        <thead className="thead-light">
                        <tr>


                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>



                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(user => {
                                return(
                                    <UserItem deleteUser = { this.deleteUser}
                                              userItem = {user}
                                              key = {user._id}

                                    />
                                )
                            })
                        }
                        </tbody>
                    </table>


                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <h6>{this.state.message}</h6>
                    </Modal.Header>

                </Modal>


            </div>

        );
    }
}

export default AllAdminUsers;