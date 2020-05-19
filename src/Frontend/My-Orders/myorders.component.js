import React, {Component, useEffect} from "react";
import axios from "axios";
import ProductRow2 from "./Sections/ProductRow2";
import jwt_decode from "jwt-decode";
import Header from "../homepage/Header";
import Footer from "../homepage/Footer";



export default class Orders extends Component{

    constructor(props) {
        super(props);
        const token = localStorage.auth
        const user = jwt_decode(token)
        this.state = {
            orders: [],
            userId:user.id,
            userName:user.CFirstName+" "+user.CLastName,
            dataAvailable:false


        };
    }

    handle = (e)=>{

        console.log("pop")
    }

    componentDidMount() {

        axios.get(`http://localhost:5000/orders/user_by_id?id=${this.state.userId}&type=single`)
            .then(response => {
                if (response.data.length >0 ){
                    this.setState({
                        orders: response.data,
                        dataAvailable:true
                    })
                }else{
                    this.setState({
                        orders: response.data,
                        dataAvailable:false
                    })
                }

            })
            .catch((error) => {
                console.log(error);
            })
    }

    myOrdersList() {
        return this.state.orders.map(currentitem => {
            return <ProductRow2 userName={this.state.userName} item={currentitem}  key={currentitem._id}/>;
        })
    }



    render()
    {
        return (
<div>
            <Header/>
<div className="cart_section">

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

                            {(this.state.dataAvailable ? this.myOrdersList() : "No Orders")}

                        </div>
                    </div>
                </div>

            </div>


</div>

    <Footer/>
    </div>
        )

    }
}