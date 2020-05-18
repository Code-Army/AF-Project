import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

const Coupon = props =>(

    <tr>
        <td>{props.id}</td>
        <td>{props.coupon.couponname}</td>
        <td>{props.coupon.couponcode}</td>
        <td>{props.coupon.couponamount}</td>
        <td>

            <Link to={"/editcoupon/" + props.coupon._id}>edit</Link> | <a href="#" onClick={() => {props.deleteCoupon(props.coupon._id)}}>delete</a>
        </td>


    </tr>

)

export default class coupondiscounts extends Component{
    constructor(props) {
        super(props);

        this.deleteCoupon = this.deleteCoupon.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.searchCoupon = this.searchCoupon.bind(this);


        this.state  = {
            coupons: [],
            searchCoupon : '',
        };
    }

    componentDidMount() {
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
    couponList(){

        return this.state.coupons.map((currentCoupons,j ) => {
            const id =j;

            return <Coupon id={id+1}  coupon = {currentCoupons} deleteCoupon = {this.deleteCoupon} key = {currentCoupons._id}> </Coupon>;


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

        axios.get(`http://localhost:5000/coupons/search/search_by_cname?cname=${this.state.searchCoupon}&type=single`)
            .then(response => {
                this.setState(
                    {coupons: response.data}
                )

            })
    }
    showAddcoupon (){
       window.location='/addcoupon'
    }

    render() {
        return (
            <div className="ml-5 mr-5">

                <form class="form-inline">
                    <i class="fas fa-search" aria-hidden="true"></i>
                    <input class="form-control form-control-sm ml-3 w-25" type="text" placeholder="Search"
                           aria-label="Search" onChange={this.onChangeSearch}/>

                    <button type="button" className="btn btn-dark float-right ml-4" onClick={this.searchCoupon}>search</button>


                </form>
                <button onClick={"/edit/"} className="btn btn-dark float-right mr-4" onClick={this.showAddcoupon}>add coupon</button>

                <br/><br/>

                <h3>Inserted Coupons </h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>No</th>
                        <th>Coupon Name</th>
                        <th>Coupon code</th>
                        <th>Coupon Amount</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.couponList()}
                    </tbody>
                </table>
            </div>
        )
    }
}


