import React, { Component } from 'react';

import axios from "axios";

class UpdateCustomer extends Component {
    constructor(props) {
        super(props);

        this.onchangeCUserName = this.onchangeCUserName.bind(this);
        this.onchangeCFirstName = this.onchangeCFirstName.bind(this);
        this.onchangeCLastName = this.onchangeCLastName.bind(this);
        this.onchangeCemail = this.onchangeCemail.bind(this);
        this.onchangeCpassword = this.onchangeCpassword.bind(this);
        this.onchangenewCpassword = this.onchangenewCpassword.bind(this);
        this.onchangeConfirmNewPassword = this.onchangeConfirmNewPassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            CUserName:'',
            CFirstName:'',
            CLastName:'',
            Cemail:'',
            Cpassword: '',
            newCpassword: '',
            confirmNewPassword: '',
        }
    }

    onchangeCUserName(e) {
        this.setState({
            CUserName: e.target.value
        })
    }
    onchangeCFirstName(e) {
        this.setState({
            CFirstName: e.target.value
        })
    }
    onchangeCLastName(e) {
        this.setState({
            CLastName: e.target.value
        })
    }

    onchangeCemail(e) {
        this.setState({
            Cemail: e.target.value
        })
    }
    onchangeCpassword(e) {
        this.setState({
            Cpassword: e.target.value
        })
    }
    onchangenewCpassword(e) {
        this.setState({
            newCpassword: e.target.value
        })
    }
    onchangeConfirmNewPassword(e) {
        this.setState({
            confirmNewPassword: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.props.location.state)
        if (this.state.newCpassword === this.state.confirmNewPassword) {
            console.log("Password match")

            if (this.props.location.state && this.props.location.state.Customer) {

                const userDetails = {
                    _id: this.props.location.state.Customer._id,
                    CUserName:this.props.state.Customer.CUserName,
                    CFirstName: this.state.Customer.CFirstName,
                    CLastName: this.state.Customer.CLastName,
                    Cemail: this.state.Customer.Cemail,
                    Cpassword: this.state.Cpassword,
                    newCpassword: this.state.newCpassword,
                }

                this.setState(
                    {
                        CUserName : '',
                        CFirstName: '',
                        CLastName: '',
                        Cemail: '',
                        Cpassword: '',
                        newCpassword: '',
                        confirmNewPassword: '',
                    }
                )

                let config = {
                    headers: {
                        'x-auth-token': localStorage.getItem("auth-token"),
                    }
                }

                axios.put('http://localhost:5000/customer/editMyProfile', userDetails, config).then(res =>
                    this.props.history.push('/customer/login')
                );
            }

            console.log("not logged in")
        }

        else {
            console.log("Password Dont Match");
        }
    }


    render() {
        return (
            <div>
                <div className="login-form">
                    <form onSubmit={this.onSubmit}>
                        <h2 className="text-center">Change Password</h2>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Old Password" required="required" value={this.state.oldPassword} onChange={this.onchangeOldPassword}></input>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="" required="required" value={this.state.CUserName} onChange={this.onchangeCUserName}></input>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="" required="required" value={this.state.CFirstName} onChange={this.onchangeCFirstName}></input>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="" required="required" value={this.state.CLastName} onChange={this.onchangeCLastName}></input>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="" required="required" value={this.state.Cpassword} onChange={this.onchangeCpassword}></input>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="" required="required" value={this.state.newCpassword} onChange={this.onchangenewCpassword}></input>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Confirm New Password" required="required" value={this.state.confirmNewPassword} onChange={this.onchangeConfirmNewPassword}></input>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Save Changes</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}