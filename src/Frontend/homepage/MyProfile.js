import React, { useContext } from "react";
import {Link, useHistory} from "react-router-dom";
import UserContext from "../../contex/UserContext";
import Header from "./Header";
import "../../web content/css/profStyle.css";

export default function MyProfile() {
    const { userData } = useContext(UserContext);
    const history = useHistory();
    // const { userData, setUserData } = useContext(UserContext);


    return (
        <div className="page">
            {userData.customer ? (
                <>
                    <Header/>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5  toppad  pull-right col-md-offset-3 ">
                                <p className=" text-info"></p>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad">
                                <div className="panel panel-info">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">{userData.customer.CUserName}</h3>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">

                                            <div className=" col-md-9 col-lg-9 ">
                                                <table className="table table-user-information">
                                                    <tbody>
                                                    <tr>
                                                        <td>First Name : </td>
                                                        <td>{userData.customer.CFirstName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Last Name : </td>
                                                        <td>{userData.customer.CLastName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>e-mail : </td>
                                                        <td>{userData.customer.Cemail}</td>
                                                    </tr>

                                                    <button onClick={() => { this.handleClick(userData.customer._id) }} className="btn btn-outline-danger btn-xs" >Delete
                                                    </button>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-footer">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            ) : (
                <>  <Header/>
                    <h2>To View My Profile Please Login First</h2>
                    <Link to="/login">Log in</Link>
                </>
            )}



        </div>
    );
}
