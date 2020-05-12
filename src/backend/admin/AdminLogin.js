import React, {Component} from 'react';
import '../CSS/adminLogin.css'
import axios from "axios";
class AdminLogin extends Component {
    constructor(props) {
        super(props);

        this.onchangePassword = this.onchangePassword.bind(this);
        this.onchangeEmail = this.onchangeEmail.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            password: '',
            email: '',


        }
    }
        onchangePassword(e){
            this.setState({
                password:e.target.value
            })
        }

        onchangeEmail(e){
            this.setState({
                email:e.target.value
            })
        }

        onSubmit(e){
            e.preventDefault();

            const newUser = {
                password:this.state.password,
                email:this.state.email
            }


            this.setState(
                {
                    password:'',
                    email:'',
                }
            )


            axios.post('http://localhost:5000/createAdminUser/login'
                , newUser).then(res => console.log(res.data));


    }
    render() {
        return (
            <div>
                <div className="login-form">
                    <form onSubmit={this.onSubmit}>
                        <h2 className="text-center">Log in</h2>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username" required="required" value={this.state.email} onChange={this.onchangeEmail}></input>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" required="required" value={this.state.password} onChange={this.onchangePassword}></input>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Log in</button>
                        </div>
                        <div className="clearfix">

                            <a href="#" className="pull-right">Forgot Password?</a>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default AdminLogin;