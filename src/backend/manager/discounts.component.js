import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import DiscountItem from "./discountItem.js"



export default class discounts extends Component{
    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('auth-token');
        if (token == null){
            window.location = '/admin/login'
        }
        //bind method
        this.deleteDiscount = this.deleteDiscount.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.searchDiscount = this.searchDiscount.bind(this);

        //set the initial state
        this.state  = {
            discounts: [],
            searchDiscount : '',
        };
    }

    //get the list of discounts from database
    componentDidMount() {

        //this.refreshTable();
        setInterval(this.searchDiscount, 2000);


    }

    refreshTable = () => {
        axios.get('http://localhost:5000/discounts/')
            .then(response => {
                this.setState(
                    {discounts: response.data}
                )
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeSearch(e){
        this.setState({
            searchDiscount : e.target.value
            }
        )
    }
    searchDiscount(){

        if (this.state.searchDiscount == ''){
            axios.get('http://localhost:5000/discounts/')
                .then(response => {
                    this.setState(
                        {discounts: response.data}
                    )
                })
                .catch((error) => {
                    console.log(error);
                })
        }else{
            axios.get(`http://localhost:5000/discounts/search/search_by_dname?name=${this.state.searchDiscount}&type=single`)
                .then(response => {
                    this.setState(
                        {discounts: response.data}
                    )
                })
        }


    }


    deleteDiscount (id){
        axios.delete('http://localhost:5000/discounts/' + id)
            .then(res => console.log(res.data));

        this.setState({
            discounts: this.state.discounts.filter(el => el._id !== id)
        })

    }
    discountList(){
        return this.state.discounts.map((currentDiscount,j ) => {
            const id =j;

            return <DiscountItem
                        id={id+1}
                        discount = {currentDiscount}
                        deleteDiscount = {this.deleteDiscount}
                        key = {currentDiscount._id}>
                   </DiscountItem>;

        })
    }
    showAddDiscount (){
      //  window.location='/adddiscount'
    }
    render() {
        return (
            <div className="ml-5 mr-5">


                <div className="row">


                    <div className="col-12">

                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Discount</h3>

                                <div className="card-tools">
                                    <div className="input-group input-group-sm" >
                                        <input type="text" name="table_search" className="form-control float-right"
                                               placeholder="Search" onChange={this.onChangeSearch}/>

                                        <div className="input-group-append">
                                            <button type="submit" className="btn btn-default" onClick={this.searchDiscount}><i
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
                                        <th>Discount Name</th>
                                        <th>Discount Amount (Rs)</th>
                                        <th>Product Name</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.discountList()}
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


