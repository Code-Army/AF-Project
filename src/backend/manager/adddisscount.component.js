import React, { Component } from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default class adddiscount extends Component {
    constructor(props) {
        super(props);

        this.onChangeDisName = this.onChangeDisName.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeDisPercent = this.onChangeDisPercent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.state = {
            products : [],
            productname:'',
            discountname : '',
            discountprecentage : '',
            show:false

        }

    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/discounts/')
        .then(response => {
            if(response.data.length > 0 ) {
                this.setState({
                    discount : response.data.map(discount => discount.discountname),
                    discountname : response.data[0].discountname

                })
            }
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
            productname: e.target.value,
            }
        )
    }
    onChangeDisName(e){
        this.setState({
            discountname: e.target.value
            }
        )
    }
    onChangeDisPercent(e){
        this.setState({
            discountprecentage: e.target.value
            }
        )
    }
    onSubmit(e){
        e.preventDefault();
        const discount =  {
            discountname : this.state.discountname,
            discountprecentage : this.state.discountprecentage,
            productname: this.state.productname,

        }
        axios.post('http://localhost:5000/discounts/add' , discount )
            .then(res => console.log(res.data));


        this.handleShow();
        this.setState({
            discountname : "",
            discountprecentage : 0,

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
    backtoDiscount(){
        window.location = '/discount';
    }
    render() {
        return (

            <div className='container'>
                <h3 className="ml-3">Create New discount Log</h3>

                <form onSubmit={this.onSubmit} className="ml-5 mr-5">
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
                        <label>discount Name</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.discountname}
                               onChange={this.onChangeDisName}>


                        </input>


                    </div>


                    <div className="form-group">
                        <label>discount percentage :</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.discountprecentage}
                               onChange={this.onChangeDisPercent}
                        />
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Create discount Log" className="btn btn-primary" onClick={this.onSubmit}/>
                        <input type="submit" value="Back to discounts" className="btn btn-dark ml-3" onClick={this.backtoDiscount}/>

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