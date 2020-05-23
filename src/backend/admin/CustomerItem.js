import React, {Component} from 'react';


class CustomerItem extends Component {
    render() {
        return (

                <tr>

                    <td>{this.props.customerItem.CFirstName}</td>
                    <td>{this.props.customerItem.CLastName}</td>
                    <td>{this.props.customerItem.Cemail}</td>
                    <td>{this.props.customerItem.CUserName}</td>
                    <td>
                        <span className=" dlt mx-2 text-danger" onClick={() => { this.props.deleteCustomer(this.props.customerItem._id) }} onMouseOver="this.style.color='red'" title={"Delete Customer"} style={{ cursor: "pointer" }}>
                            <i className="fas fa-trash" ></i>
                        </span>
                    </td>

                </tr>

        );
    }
}

export default CustomerItem;