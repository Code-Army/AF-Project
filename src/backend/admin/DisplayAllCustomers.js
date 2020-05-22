import React, {Component} from 'react';
import axios from "axios";
import CustomerItem from './CustomerItem';
import Modal from "react-bootstrap/Modal";

class DisplayAllCustomers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers:[],
            message:'',
            show:false
        }
        this.onchangeEmail = this.onchangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/customer/AllCustomers').then(res =>{
            this.setState({customers:res.data});
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }

    onchangeEmail(e) {
        this.setState({
            email: e.target.value
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

    onSubmit(e) {
        e.preventDefault();

        const searchUser = {
            email: this.state.email

        }

        axios.post('http://localhost:5000/customer/getCustomerByMail'
            , searchUser).then(res => {
            console.log(res.data)
            this.setState({
                customers :res.data,

            });

            if(this.state.customers.length === 0){
                console.log('No customers')
                this.handleShow()
                this.setState({
                    message:'No customer is found for this email..!'
                })
            }
            });


    }

    deleteCustomer(id){
        axios.delete('http://localhost:5000/customer/'+id)
            .then(res => {
                console.log(res.data)
                this.handleShow()
                this.setState(
                    {
                        message:res.data.msg,
                    }
                )
                console.log('delete')
            });
        this.setState({
            customers: this.state.customers.filter(el => el._id !== id)
        })
    }


    render() {
        return (
            <div className="container">

                <br/><br/><br/>
                <div className="col-md-6">
                    <form className="form-inline" onSubmit={this.onSubmit}>

                        <div className="form-group">

                           <input type="email" className="form-control rounded" placeholder="Enter Email" id="email" name="email" value={this.state.email} onChange={this.onchangeEmail}   />

                        </div>

                        <button type="submit" className="btn btn-primary btn-raised rounded"
                                style={{margin: "5px"}}>Search
                        </button>
                    </form>
                </div>
                <br/>
                <div className="table-responsive-md">
                    <table className="table table-hover" >

                        <thead className="thead-light">
                        <tr>


                            <th>First Name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.customers.map(customer => {
                                return(
                                    <CustomerItem deleteCustomer = { this.deleteCustomer}
                                              customerItem = {customer}
                                              key = {customer._id}

                                    />
                                )
                            })
                        }
                        </tbody>
                    </table>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <h6>{this.state.message}</h6>
                        </Modal.Header>

                    </Modal>
                </div>
            </div>
        );
    }
}

export default DisplayAllCustomers;