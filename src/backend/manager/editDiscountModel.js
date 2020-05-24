import React, { Component } from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

export default class editDiscountModel extends Component {

    constructor(props) {
        super(props);

        this.onChangeDiscountName = this.onChangeDiscountName.bind(this);
        this.onChangeDiscountPrecentage = this.onChangeDiscountPrecentage.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.state = {
            discountname : '',
            products : [],
            discountamount : '',
            discounts : [],
            show:false,
            modelMsg:'',
            error:false,
            success:false


        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/discounts/' + this.props.discountId)
            .then(response => {
                this.setState({
                    discountname: response.data.discountname,
                    discountamount: response.data.discountamount,
                    productname: response.data.productname,


                })


            })
            .catch(function (error) {
                console.log(error)

            })
        axios.get('http://localhost:5000/products/')
            .then(response => {
                if(response.data.length > 0 ) {
                    this.setState({
                        products:response.data,


                    })

                }
            })

    }
    onChangeProductName(e){
        this.setState({
                productname: e.target.value,
            }
        )
    }
    onChangeDiscountName(e){
        this.setState({
                discountname: e.target.value
            }
        )
    }
    onChangeDiscountPrecentage(e){
        this.setState({
                discountamount: e.target.value
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

    //Validate Text boxes
    handleValidate(){

        let error = false;
        let errMsg = "";
        if (this.state.discountname == ''){
            error = true;
            errMsg = "Required Discount Name"
        }else if( this.state.discountamount == ''){
            error = true;
            errMsg = "Required Discount Amount"
        }else if(this.state.productname == ''){
            error = true;
            errMsg = "Required Product Name"
        }
        this.setState({
            modelMsg:errMsg,
            error:error
        })
        return error
    }

    onSubmit(e){
        e.preventDefault();

        if(this.handleValidate()){
            //Error
            this.setState({
                error:true
            })
        }else{
            const item = {
                discountname: this.state.discountname,
                discountamount: this.state.discountamount,
                productname: this.state.productname,

            }

            axios.post('http://localhost:5000/discounts/update/' + this.props.discountId , item )
                .then(res => console.log(res.data));
            this.setState({
                discountname : "",
                discountamount : "",
                show:false,
                success:true
            })

        }

        // window.location='/discount'



    }
    backtoDiscount(){
        window.location = '/discount';
    }

    render() {
        return (
            <div>
                <Modal size="md" show={this.props.showEditModal} onHide={this.props.onCloseModal}>
                    <Modal.Header closeButton>
                        <h4>Edit Discount</h4>
                    </Modal.Header>
                    <Modal.Body><div className="editCat">
                        {this.state.error ? <div className="alert alert-danger" role="alert">
                            {this.state.modelMsg}
                        </div> :""}

                        {this.state.success ?  <div className="alert alert-success" role="alert">
                            Discount Updated
                        </div> :""}
                        <div>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group row">
                                    <label className="col-sm-8 col-form-label">Select Product</label>
                                    <select ref="userInput"
                                            required
                                            className="form-control mr-5"
                                            value={this.state.productname}
                                            onChange={this.onChangeProductName}>
                                        {
                                            this.state.products.map(function(product) {
                                                return <option
                                                    key={product}
                                                    value={product.productname}
                                                >{product.productname}

                                                </option>;
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-8 col-form-label">Discount Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.discountname} onChange={this.onChangeDiscountName} placeholder="Name"></input>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-8 col-form-label">Discount Amount</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" value={this.state.discountamount} onChange={this.onChangeDiscountPrecentage} placeholder="Name" required></input>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <input  type="submit" value="Update Discount" class="btn btn-primary"></input>
                                </div>
                            </form>
                        </div>

                    </div>

                    </Modal.Body></Modal>
            </div>
        )
    }

}