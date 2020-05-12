import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EditAdminUser from "./EditAdminUser";

const UserItem = props => {
    return(
        <tr>

            <td>{props.userItem.name}</td>
            <td>{props.userItem.email}</td>
            <td>{props.userItem.status}</td>
            <td>{props.userItem.createdAt}</td>
            <td>{props.userItem.updatedAt}</td>
            <td>
                <Router>
                <span className=" edit mx-2 text-primary"  title={"Edit User"} style={{cursor:"pointer"}}>

                        <Link to={"/edit/"+props.userItem._id}><i className="fa fa-pencil-square-o" aria-hidden="true"/></Link>

                </span>
                    <Route path ="/edit/:id" component={EditAdminUser}></Route>
                </Router>
            </td>
            <td>
                <span className=" dlt mx-2 text-danger" onClick={()=>{props.deleteUser(props.userItem._id)}} onMouseOver="this.style.color='red'" title={"Delete User"}style={{cursor:"pointer"}}>
                        <i className="fas fa-trash" ></i>
                    </span>
            </td>

        </tr>


    )
}

export default UserItem