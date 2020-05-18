import React, { Component } from 'react';
import axios from "axios";
import {storage} from './../../firebase'
import Modal from "react-bootstrap/Modal";

export default class editdiscount extends Component {
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
            discountprecentage : '',
            discounts : [],
            show:false


        }

    }
    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/discounts/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    discountname: response.data.discountname,
                    discountprecentage: response.data.discountprecentage,


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
                        productname : response.data[0].productname,

                    })

                }
            })

    }
    onChangeProductName(e){
        this.setState({
                productname: e.target.productname,
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
            discountprecentage: e.target.value
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
            discountname: this.state.discountname,
            discountprecentage: this.state.discountprecentage,
            productname: this.state.productname,

        }

        // console.log(this.state.discountname);
        // console.log(this.state.discountprecentage);


        axios.post('http://localhost:5000/discounts/update/' + this.props.match.params.id , item )
            .then(res => console.log(res.data));
        this.setState({
            discountname : "",
            discountprecentage : "",
            show:false
        })


    }
    backtoDiscount(){
        window.location = '/discount';
    }
    render() {
        return (
            <div className="container" >
                <h3 className="header ml-3 ">Edit  Discount Log</h3>
                <div className="ml-3 mr-3">
                    <div>
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
                    <div className="form-group">
                        <label>Discount Name</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.discountname}
                               onChange={this.onChangeDiscountName}>


                        </input>

                    </div>

                    <div className="form-group">
                        <label>Discount precentage :</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.discountprecentage}
                               onChange={this.onChangeDiscountPrecentage}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.handleShow}>Edit Discount Log</button>
                        <input type="submit" value="Back to discounts" className="btn btn-dark ml-3" onClick={this.backtoDiscount}/>

                    </div>



                </div>
                <Modal show={this.state.show}>
                    <Modal.Header closeButton>
                        <Modal.Title>notofication</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>data update successfull.</Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" className="btn btn-success " onClick={this.handleClose}>
                            Close
                        </button>
                        <button variant="primary" className="btn btn-danger" onClick={this.onSubmit}>
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}