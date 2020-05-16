import React, { Component } from 'react';
import '../CSS/adminLogin.css'
import axios from "axios";
import { BrowserRouter, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";
class AdminLogin extends Component {
    constructor(props) {
        super(props);

        this.onchangePassword = this.onchangePassword.bind(this);
        this.onchangeEmail = this.onchangeEmail.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            password: '',
            email: '',
            redirectChangepassword: false,
            errors: {
                email: '',
                password: '',
                other: ''
            }
        }
    }

    setRedirect = (user) => {
        this.setState({
            redirectChangepassword: true,
            user: user
        })
    }

    renderRedirect = () => {
        if (this.state.redirectChangepassword) {
            return <Redirect to={{
                pathname: "/admin/changepassword",
                state: { user: this.state.user }
            }} />
        }
    }


    onchangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onchangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    validateForm() {
        let error = false
        if (this.state.email === '') {
            error = true
            this.setState({
                errors: {
                    ...this.state.errors,
                    email: 'Email cannot be empty',
                }
            })
        }



        return error
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {

            const newUser = {
                password: this.state.password,
                email: this.state.email
            }

            this.setState(
                {
                    password: '',
                    email: '',
                    errors: {
                        email: '',
                        password: '',
                        other: ''
                    }
                }
            )

            axios.post('http://localhost:5000/createAdminUser/login', newUser).then(res => {
                console.log(res.data)

                const user = {
                    _id: res.data.adminUser._id,
                    email: res.data.adminUser.email,
                    name: res.data.adminUser.name,
                    confirmStatus: res.data.adminUser.status,
                    role: res.data.adminUser.role
                }

                console.log(user)

                sessionStorage.setItem("auth-token", res.data.token);
                sessionStorage.setItem('user', JSON.stringify(user));

                // console.log(res.data && res.data.adminUser && res.data.adminUser.firstLogin)

                if (res.data && res.data.adminUser && res.data.adminUser.firstLogin === "0")
                    this.setRedirect(user)
                else {
                    this.props.history.push('/admin/')
                }
            })
                .catch((err) => {
                    console.log(err.response)
                    this.setState({
                        errors: {
                            ...this.state.errors,
                            other: err.response.data.msg,
                        }
                    })
                })
        }

    }
    render() {
        const { errors } = this.state;

        return (
            <div>
                {this.renderRedirect()}
                <div className="login-form">
                    <form onSubmit={this.onSubmit}>
                        <h2 className="text-center">Log in</h2>
                        <div className="form-group">
                            {errors.other.length > 0 &&
                            <span className='error'>{errors.other}</span>}
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username" required="required" value={this.state.email} onChange={this.onchangeEmail}></input>
                            {errors.email.length > 0 &&
                            <span className='error'>{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" required="required" value={this.state.password} onChange={this.onchangePassword}></input>
                            {errors.password.length > 0 &&
                            <span className='error'>{errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Log in</button>
                        </div>

                    </form>

                </div>
            </div>
        );
    }
}

export default AdminLogin;