import React, {Component, useState} from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../../App.css";
class loginCustomer extends Component{
render(){
    return (
        <div>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    {/*Tabs Titles */}
                    <h2 className="active"> Sign In </h2>

                    {/*Login Form */}
                    <form>
                        <input type="text" id="login" className="fadeIn second" name="login" placeholder="login"/>
                            <input type="text" id="password" className="fadeIn third" name="login"
                                   placeholder="password"/>
                                <input type="submit" className="fadeIn fourth" value="Log In"/>
                    </form>

                    {/*Remind Passowrd*/}
                    <div id="formFooter">
                        <a className="underlineHover" href="#">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </div>
    );

}
}
export default loginCustomer;