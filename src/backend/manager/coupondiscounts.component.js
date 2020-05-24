import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import CouponItem from "./CouponItem";



export default class coupondiscounts extends Component{
    constructor(props) {
        super(props);

        const token = sessionStorage.getItem('auth-token');
        if (token == null){
            window.location = '/admin/login'
        }
        //bind methods
        this.deleteCoupon = this.deleteCoupon.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.searchCoupon = this.searchCoupon.bind(this);

        //set initial state
        this.state  = {
            coupons: [],
            searchCoupon : '',
        };
    }

    //get the list of coupons from database
    componentDidMount() {

        //this.refreshTable();
setInterval(this.searchCoupon,2000)

    }


    refreshTable = () => {
        axios.get('http://localhost:5000/coupons/')
            .then(response => {
                this.setState(
                    {coupons: response.data}
                )
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //
    couponList(){

        return this.state.coupons.map((currentCoupons,j ) => {
            const id =j;

            return <CouponItem id={id+1}  coupon = {currentCoupons} deleteCoupon = {this.deleteCoupon} key = {currentCoupons._id}> </CouponItem>;


        })
    }

    deleteCoupon (id){

        axios.delete('http://localhost:5000/coupons/' + id)
            .then(res => console.log(res.data));

        this.setState({
            coupons: this.state.coupons.filter(el => el._id !== id)
        })
    }
    onChangeSearch(e){


        this.setState({
            searchCoupon: e.target.value
            }
        )
    }
    searchCoupon(){

        if (this.state.searchCoupon == ''){
            axios.get('http://localhost:5000/coupons/')
                .then(response => {
                    this.setState(
                        {coupons: response.data}
                    )
                })
                .catch((error) => {
                    console.log(error);
                })
        }else{

            axios.get(`http://localhost:5000/coupons/search/search_by_cname?cname=${this.state.searchCoupon}&type=single`)
                .then(response => {
                    this.setState(
                        {coupons: response.data}
                    )

                })
        }


    }
    showAddcoupon (){
       window.location='/addcoupon'
    }

    render() {
        return (



                <div className="row">


                    <div className="col-12">

                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Products</h3>

                                <div className="card-tools">
                                    <div className="input-group input-group-sm" >
                                        <input type="text" name="table_search" className="form-control float-right"
                                               placeholder="Search" onChange={this.onChangeSearch}/>

                                        <div className="input-group-append">
                                            <button type="submit" className="btn btn-default" onClick={this.searchCoupon}><i
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
                                        <th>Coupon Name</th>
                                        <th>Coupon code</th>
                                        <th>Coupon Amount (Rs)</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.couponList()}
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                </div>


        )
    }
}


