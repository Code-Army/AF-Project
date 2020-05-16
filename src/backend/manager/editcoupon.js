import React, { Component } from 'react';
import axios from "axios";
import {storage} from './../../firebase'
import Modal from "react-bootstrap/Modal";

export default class editcoupon extends Component {
    constructor(props) {

        super(props);
        this.onChangeCouponName = this.onChangeCouponName.bind(this)
        this.onChangeCouponCode = this.onChangeCouponCode.bind(this)
        this.onChangeCouponAmount = this.onChangeCouponAmount.bind(this)
        this.onChangeSubmit=this.onChangeSubmit.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.handleShow=this.handleShow.bind(this)

        this.state = {
            couponname: '',
            couponcode: '',
            couponamount: '',
            coupons:[],
            show: false



        }

    }
    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/coupons/' + this.props.match.params.id)
            .then(responce => {
                this.setState({
                    couponname: responce.data.couponname,
                    couponcode: responce.data.couponcode,
                    couponamount: responce.data.couponamount,

                })
            })
            .catch(function (error) {
                console.log(error)

            })


    }

    onChangeCouponName(e){
        this.setState({
            couponname:e.target.value
        })
    }
    onChangeCouponCode(e){
        this.setState({
            couponcode:e.target.value
        })
    }
    onChangeCouponAmount(e){
        this.setState({
            couponamount:e.target.value
        })
    }
    onChangeSubmit(e){
        e.preventDefault();

        const coupon = {
            couponname:this.state.couponname,
            couponcode:this.state.couponcode,
            couponamount:this.state.couponamount,
        }
        axios.post('http://localhost:5000/coupons/update/' + this.props.match.params.id , coupon )
            .then(res => console.log(res.data));

        this.setState({
            couponname:"",
            couponcode:"",
            couponamount:"",
            show:false
        })


    }
    handleClose(){
        this.setState({
            show:false
        })
    }
    handleShow(){
        this.setState({
            show:true
        })
    }

    render() {
        return (
            <div className="container">
                <h3 className="ml-3">Edit coupon Log</h3>


                <form onSubmit={this.onSubmit} className="ml-5 mr-5">
                    <div className="form-group">
                        <label>coupon Name</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.couponname}
                               onChange={this.onChangeCouponName}
                        >
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Coupon code :</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.couponcode}
                            onChange={this.onChangeCouponCode}
                        >
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Coupon Amount :</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.couponamount}
                            onChange={this.onChangeCouponAmount}
                        >
                        </input>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create coupon Log" className="btn btn-primary"/>
                        <input type="submit" value="Back to Coupon" className="btn btn-dark ml-3"/>

                    </div>

                </form>

            </div>
        );
    }
}