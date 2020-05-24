import React, { Component } from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default class addcoupon extends Component {
    constructor(props) {
        super(props);

        const token = sessionStorage.getItem('auth-token');
        if (token == null){
            window.location = '/admin/login'
        }
        //method bind
        this.onChangeCouponName = this.onChangeCouponName.bind(this);
        this.onChangeCouponCode = this.onChangeCouponCode.bind(this);
        this.onChangeCouponAmount = this.onChangeCouponAmount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

        //set the initial state of the component
        this.state = {
            couponname : '',
            couponcode : '',
            couponamount:'',
            show:false,
            modelMsg:'',
            error:false,

        }

    }
    //set states when coupon name changed
    onChangeCouponName(e){
        this.setState({
            couponname: e.target.value
            }
        )
    }
    //set states when coupon name changed
    onChangeCouponCode(e){
        this.setState({
            couponcode: e.target.value
            }
        )
    }
    //set states when coupon amount changed
    onChangeCouponAmount(e){
        this.setState({
            couponamount: e.target.value
            }
        )
    }

    //Validate Text boxes
    handleValidate(){

        let error = false;
        let errMsg = "";
        if (this.state.couponname == ''){
            error = true;
            errMsg = "Required Coupon Name"
        }else if( this.state.couponcode == ''){
            error = true;
            errMsg = "Required Coupon Code"
        }else if(this.state.couponamount == ''){
            error = true;
            errMsg = "Required Coupon Amount"
        }
        this.setState({
            modelMsg:errMsg,
            error:error
        })
        return error
    }

    //when submit button clicked
    onSubmit(e){
        e.preventDefault();

        if(this.handleValidate()){
            //Error
            this.setState({
                show:true
            })
        }else{
            const coupon =  {
                couponname : this.state.couponname,
                couponcode : this.state.couponcode,
                couponamount : this.state.couponamount,
            }
            axios.post('http://localhost:5000/coupons/add' , coupon )
                .then(res => console.log(res.data));
            this.handleShow();
            this.setState({
                modelMsg:"Coupon Added",
                couponname : "",
                couponcode :"",
                couponamount : "",
            })

        }

    }

    handleClose(){
        this.setState({
            show:false

        })
        // window.location = '/coupon'

    }
    handleShow(){
        this.setState({
            show:true
        })

    }
    backtoCoupon(){
        window.location = '/coupon';
    }
    render() {
        return (

            <div className='container'>



                <Modal show={this.state.show} onHide={this.handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Coupon Notification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.modelMsg}</Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={this.handleClose}>
                            Close
                        </button>
                        {this.state.error == false ?  <btton class="btn btn-success" onClick={this.handleClose}>
                            Ok
                        </btton>:  <btton class="btn btn-warning" onClick={this.handleClose}>
                            Ok
                        </btton>}
                    </Modal.Footer>
                </Modal>

                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Create New coupon Log</h3>
                    </div>

                    <form role="form" onSubmit={this.onSubmit}>
                        <div className="card-body">

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Coupon Name</label>
                                <input type="text" className="form-control" id="exampleInputPassword1"
                                       placeholder=""  value={this.state.couponname}
                                       onChange={this.onChangeCouponName}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Coupon Code </label>
                                <input type="text" className="form-control" id="exampleInputPassword1"
                                       placeholder=""   value={this.state.couponcode}
                                       onChange={this.onChangeCouponCode}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Coupon Amount </label>
                                <input type="number" className="form-control" id="exampleInputPassword1"
                                       placeholder=""      value={this.state.couponamount}
                                       onChange={this.onChangeCouponAmount} required/>
                            </div>

                        </div>


                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary"  >Submit</button>

                        </div>
                    </form>
                </div>

            </div>
        );
    }




}