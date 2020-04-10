import React, {Component} from 'react';


const UserItem = props => {
    return(
        <tr>
            <td>{props.userItem._id}</td>
            <td>{props.userItem.name}</td>
            <td>{props.userItem.email}</td>
            <td>{props.userItem.status}</td>
            <td>{props.userItem.createdAt}</td>
            <td>{props.userItem.updatedAt}</td>
            <td>
                <span  className=" edit mx-2 text-dark"  title={"Edit User"} style={{cursor:"pointer"}}>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </span>
                <span className=" dlt mx-2 text-danger" onClick={()=>{props.deleteUser(props.userItem._id)}} onMouseOver="this.style.color='red'" title={"Delete User"}style={{cursor:"pointer"}}>
                        <i className="fas fa-trash" onMouseOver="this.style.color='red'"></i>
                    </span>
            </td>

        </tr>
    )
}

export default UserItem