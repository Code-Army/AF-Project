import React, {Component} from 'react';
import '../CSS/adminChangePassword.css'
class AdminConfirmPassword extends Component {
    render() {
        return (

                <div className="signup-form">
                    <form>
                        <h2>Change Password</h2>


                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-paper-plane"></i></span>
                                <input type="email" className="form-control" id="email" placeholder="Enter Email"
                                       required="required"></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                <input type="text" className="form-control" id="password" placeholder=" Enter Password"
                                       required="required"></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
				<span className="input-group-addon">
					<i className="fa fa-lock"></i>
					<i className="fa fa-check"></i>
				</span>
                                <input type="text" className="form-control" id="confirmPassword"
                                       placeholder="Confirm Password" required="required"></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block btn-lg">Change Password</button>
                        </div>

                    </form>

            </div>
        );
    }
}

export default AdminConfirmPassword;