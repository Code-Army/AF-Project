import React, { Component } from 'react';
import axios from "axios";
import {storage} from './../../firebase'
import Modal from "react-bootstrap/Modal";

export default class editcoupon extends Component {
    constructor(props) {
        super(props);

        this.onChangeCouponName = this.onChangeCouponName.bind(this);
        this.onChangeCouponCode = this.onChangeCouponCode.bind(this);
        this.onChangeCouponAmount = this.onChangeCouponAmount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);



        this.state = {
            couponname : '',
            couponcode : '',
            couponamount : '',
            coupons : [],
            show:false


        }

    }
    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/coupons/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    couponname: response.data.couponname,
                    couponcode: response.data.couponcode,
                    couponamount: response.data.couponamount,

                })


            })
            .catch(function (error) {
                console.log(error)

            })

    }
    onChangeCouponName(e){
        this.setState({
            couponname: e.target.value
            }
        )
    }
    onChangeCouponCode(e){
        this.setState({
            couponcode: e.target.value
            }
        )
    }
    onChangeCouponAmount(e){
        this.setState({
            couponamount: e.target.value
            }
        )
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
    onSubmit(e){
        e.preventDefault();

        const item = {
            couponname: this.state.couponname,
            couponcode: this.state.couponcode,
            couponamount: this.state.couponamount,
        }

        console.log(this.state.couponname);


        axios.post('http://localhost:5000/coupons/update/' + this.props.match.params.id , item )
            .then(res => console.log(res.data));
        this.setState({
            couponname : "",
            couponcode : "",
            couponamount : "",
            show:false
        })


    }
    render() {
        return (
            <div>
               <p> this is edit coupon</p>
            </div>
        );
    }
}