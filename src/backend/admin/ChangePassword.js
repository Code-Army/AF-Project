import React, { Component } from 'react';
import '../CSS/adminLogin.css'
import axios from "axios";
class AdminLogin extends Component {
    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('auth-token');
        if (token == null){
            window.location = '/admin/login'
        }
        this.onchangeOldPassword = this.onchangeOldPassword.bind(this);
        this.onchangeNewPassword = this.onchangeNewPassword.bind(this);
        this.onchangeConfirmNewPassword = this.onchangeConfirmNewPassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        }
    }
    onchangeOldPassword(e) {
        this.setState({
            oldPassword: e.target.value
        })
    }

    onchangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
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
        if (this.state.newPassword === this.state.confirmNewPassword) {
            console.log("Password match")

            if (this.props.location.state && this.props.location.state.user) {

                const userDetails = {
                    _id: this.props.location.state.user._id,
                    oldPassword: this.state.oldPassword,
                    newPassword: this.state.newPassword,
                }

                this.setState(
                    {
                        oldPassword: '',
                        newPassword: '',
                        confirmNewPassword: '',
                    }
                )

                let config = {
                    headers: {
                        'x-auth-token': sessionStorage.getItem("auth-token"),
                    }
                }

                axios.put('http://localhost:5000/createAdminUser/changepassword', userDetails, config).then(res =>
                    this.props.history.push('/admin/login')
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
                            <input type="password" className="form-control" placeholder="Old Password" required="required" value={this.state.oldPassword} onChange={this.onchangeOldPassword}></input>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="New Password" required="required" value={this.state.newPassword} onChange={this.onchangeNewPassword}></input>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Confirm New Password" required="required" value={this.state.confirmNewPassword} onChange={this.onchangeConfirmNewPassword}></input>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Change Password</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default AdminLogin;