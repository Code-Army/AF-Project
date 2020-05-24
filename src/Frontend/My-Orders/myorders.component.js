import React, {Component, useEffect} from "react";
import axios from "axios";
import ProductRow2 from "./Sections/ProductRow2";
import jwt_decode from "jwt-decode";
import Header from "../homepage/Header";
import Footer from "../homepage/Footer";
import Modal from "react-bootstrap/Modal";



export default class Orders extends Component{

    constructor(props) {
        super(props);

        const isLogin = localStorage.getItem('isLogin')

        if (isLogin == "false"){
            window.location = '/'
            this.state = {
                orders: [],
                dataAvailable:false,

            };
        }else{
            const token = localStorage.auth
            const user = jwt_decode(token)

            this.state = {
                orders: [],
                userId:user.id,
                userName:user.CFirstName+" "+user.CLastName,
                dataAvailable:false,

            };
        }




    }



    handle = (e)=>{

        console.log("pop")
    }

    componentDidMount() {

        const isLogin = localStorage.getItem('isLogin')
        if (isLogin == "true"){

            this.getData();
            setInterval(this.getData, 2000);
        }


    }


    getData = () => {
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
            return <ProductRow2 userName={this.state.userName} item={currentitem} deleteOrder={this.deleteOrder} key={currentitem._id} updateStatusnew={this.updateStatusnew.bind(this)}/>;
        })
    }

    updateStatusnew(){
        console.log("id - ")

        const myOrder = {
            status:"complete"

        }

        axios.post('http://localhost:5000/orders/update/'+this.props.item._id, myOrder)
            .then(res => console.log(res.data));
    }

    render()
    {

        const mystyle = {
            color: "white",
            backgroundColor: "#5a646b",

            fontFamily: "Arial",
            padding:"10px",
            paddingBottom:"10px"
        };

        const header = {
            textAlign: "center",

        }
        return (
<div>
            <Header/>


    <div style={mystyle}>
        <div style={header}>
            <h2>MY ORDERS</h2>
        </div>

    </div>
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