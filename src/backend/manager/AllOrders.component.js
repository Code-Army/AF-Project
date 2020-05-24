import React, {Component} from "react";
import axios from "axios";
import DiscountItem from "./discountItem";
import OrderItem from "./OrderItem";


export default class AllOrders extends Component{

    constructor(props) {
        super(props);

        const token = sessionStorage.getItem('auth-token');
        if (token == null){
            window.location = '/admin/login'
        }

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.searchOrder = this.searchOrder.bind(this);
        this.state={
            orders:[],
            searchOrder:''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/orders/')
            .then(response => {
                this.setState(
                    {orders: response.data}
                )
            })
            .catch((error) => {
                console.log(error);
            })
    }

    OrderList(){
        return this.state.orders.map((currentOrder,j ) => {
            const id =j;

            return <OrderItem
                id={id+1}
                order = {currentOrder}
                key = {currentOrder._id}>
            </OrderItem>;

        })
    }
    searchOrder(){

        if (this.state.searchOrder == ''){
            axios.get('http://localhost:5000/orders/')
                .then(response => {
                    this.setState(
                        {orders: response.data}
                    )
                })
                .catch((error) => {
                    console.log(error);
                })
        }else{
            axios.get(`http://localhost:5000/orders/search/search_by_pname?name=${this.state.searchOrder}&type=single`)
                .then(response => {
                    this.setState(
                        {orders: response.data}
                    )
                })
        }


    }


    onChangeSearch(e){
        console.log(e.target.value)
        this.setState({
            searchOrder : e.target.value
            }
        )
    }
    render(){
        return(
            <>
                <div className="ml-5 mr-5">


                    <div className="row">


                        <div className="col-12">

                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">All Orders</h3>

                                    <div className="card-tools">
                                        <div className="input-group input-group-sm" >
                                            <input type="text" name="table_search" className="form-control float-right"
                                                   placeholder="Search" onChange={this.onChangeSearch}/>

                                            <div className="input-group-append">
                                                <button type="submit" className="btn btn-default" onClick={this.searchOrder}><i
                                                    className="fas fa-search"></i></button>&nbsp;&nbsp;

                                            </div>


                                        </div>
                                    </div>
                                </div>

                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover text-nowrap">
                                        <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Product Name</th>
                                            <th>Product Image</th>
                                            <th>Order Status</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.OrderList()}
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}