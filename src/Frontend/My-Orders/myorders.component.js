import React, {Component, useEffect} from "react";
import axios from "axios";
import ProductRow2 from "./Sections/ProductRow2";



export default class Cart extends Component{

    constructor(props) {
        super(props);

        this.state = {
            orders: []


        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/orders/')
            .then(response => {
                this.setState({ orders: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    myOrdersList() {
        return this.state.orders.map(currentitem => {
            return <ProductRow2 item={currentitem}  key={currentitem._id}/>;
        })
    }

    render()
    {
        return (

            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="cart_container">


                            <div className="cart_bar">
                                <ul className="cart_bar_list item_list d-flex ">
                                    <li></li>
                                    <li></li>
                                    <li className="mr-auto">Product</li>
                                    <li>Status</li>
                                    <li></li>
                                    <li></li>

                                </ul>
                            </div>
                            {this.myOrdersList()}

                        </div>
                    </div>
                </div>

            </div>

        )

    }
}