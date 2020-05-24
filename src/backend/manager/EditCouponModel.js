import React, { Component } from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

export default class editCouponModel extends Component {
    constructor(props) {
        super(props);

        this.onChangeCouponName = this.onChangeCouponName.bind(this)
        this.onChangeCouponCode = this.onChangeCouponCode.bind(this)
        this.onChangeCouponAmount = this.onChangeCouponAmount.bind(this)
        this.onChangeSubmit=this.onChangeSubmit.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.handleShow=this.handleShow.bind(this)
        this.showcoupon=this.showcoupon.bind(this)

        this.state = {
            couponname: '',
            couponcode: '',
            couponamount: '',
            coupons:[],
            show: false,
            modelMsg:'',
            error:false,
            success:false


        }

    }
    componentDidMount() {


        axios.get('http://localhost:5000/coupons/' + this.props.couponId)
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


    onChangeSubmit(e){
        e.preventDefault();

        if(this.handleValidate()){
            //Error
            this.setState({
                error:true
            })
        }else{
            const coupon = {
                couponname:this.state.couponname,
                couponcode:this.state.couponcode,
                couponamount:this.state.couponamount,
            }
            axios.post('http://localhost:5000/coupons/update/' + this.props.couponId , coupon)
                .then(res => console.log(res.data));

            this.setState({
                success:true,
                couponname:"",
                couponcode:"",
                couponamount:"",
                show:false
            })

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
    showcoupon (){
        //window.location='/coupon'
    }

    render() {
        return (
            <>
                <Modal size="md" show={this.props.showEditModal} onHide={this.props.onCloseModal}>
                    <Modal.Header closeButton>
                        <h4>Edit Discount</h4>
                    </Modal.Header>
                    <Modal.Body><div className="editCat">
                        {this.state.error ? <div className="alert alert-danger" role="alert">
                            {this.state.modelMsg}
                        </div> :""}

                        {this.state.success ?  <div className="alert alert-success" role="alert">
                            Coupon Updated..
                        </div> :""}




                        <div>
                            <form onSubmit={this.onChangeSubmit}>


                                <div className="form-group row">
                                    <label className="col-sm-8 col-form-label">Coupon Name</label>
                                    <div className="col-sm-10">
                                        <input type="text"
                                               required
                                               className="form-control"
                                               value={this.state.couponname}
                                               onChange={this.onChangeCouponName}
                                        >
                                        </input>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-8 col-form-label">Coupon Code</label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            value={this.state.couponcode}
                                            onChange={this.onChangeCouponCode}
                                        >
                                        </input>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-8 col-form-label">Coupon Amount</label>
                                    <div className="col-sm-10">
                                        <input
                                            type="number"
                                            required
                                            className="form-control"
                                            value={this.state.couponamount}
                                            onChange={this.onChangeCouponAmount}

                                        >
                                        </input>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <input type="submit" value="Edit Category" className="btn btn-primary btn-block rounded py-2"></input>
                                </div>
                            </form>
                        </div></div></Modal.Body></Modal>
                </>
        )
    }
}
