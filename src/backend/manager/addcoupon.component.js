import React, { Component } from 'react';
import axios from "axios";
import {storage} from './../../firebase'
import Modal from "react-bootstrap/Modal";

export default class addcoupon extends Component {
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
            couponamount:'',
            show:false

        }

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

    backtoCoupon(){
       window.location = '/coupon';
    }
    componentDidMount() {
        axios.get('http://localhost:5000/coupons/')
            .then(response => {
                if(response.data.length > 0 ) {
                    this.setState({
                        coupons : response.data.map(coupon => coupon.couponname),
                        couponname : response.data[0].couponname

                    })
                }
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
    onSubmit(e){
        e.preventDefault();
           const coupon =  {
               couponname : this.state.couponname,
               couponcode : this.state.couponcode,
               couponamount : this.state.couponamount,
           }
        axios.post('http://localhost:5000/coupons/add' , coupon )
            .then(res => console.log(res.data));

           this.setState({
               couponname : "",
               couponcode :"",
               couponamount : "",
           })
        console.log(coupon)
        this.handleShow();

    }
    render() {
        return (

            <div className='container'>
                <h3 className="ml-3">Create New coupon Log</h3>

                <form onSubmit={this.onSubmit} className="ml-5 mr-5">
                    <div className="form-group">
                        <label>coupon Name</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.couponname}
                               onChange={this.onChangeCouponName}>


                        </input>

                    </div>

                    <div className="form-group">
                        <label>coupon code :</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.couponcode}
                               onChange={this.onChangeCouponCode}
                        />
                    </div>
                    <div className="form-group">
                        <label>coupon amount :</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.couponamount}
                               onChange={this.onChangeCouponAmount}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create coupon Log" className="btn btn-primary"/>
                        <input type="submit" value="Back to Coupon" className="btn btn-dark ml-3" onClick={this.backtoCoupon}/>

                    </div>



                </form>
                <Modal show={this.state.show}>
                    <Modal.Header closeButton>
                        <Modal.Title>notofication</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>data inserted successfully.</Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" className="btn btn-success " onClick={this.handleClose}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }




}