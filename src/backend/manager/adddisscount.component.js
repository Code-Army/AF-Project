import React, { Component } from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default class adddiscount extends Component {
    constructor(props) {
        super(props);

        const token = sessionStorage.getItem('auth-token');
        if (token == null){
            window.location = '/admin/login'
        }
        //method bind
        this.onChangeDisName = this.onChangeDisName.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeDisPercent = this.onChangeDisPercent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

        //set the initial state of the component
        this.state = {
            products : [],
            productname:'',
            discountname : '',
            discountamount : '',
            show:false,
            pid:'',
            modelMsg:'',
            error:false,

        }

    }
    //get the list of and product from database
    componentDidMount()
    {
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
    //set states when product name changed
    onChangeProductName(e){

        var selectedIndex = e.target.options.selectedIndex;
        console.log(e.target.options[selectedIndex].getAttribute('id'))
        this.setState({
            productname: e.target.value,
            pid:e.target.options[selectedIndex].getAttribute('id')
            }
        )
    }
    //set states when discount name changed
    onChangeDisName(e){
        this.setState({
            discountname: e.target.value

            }
        )
    }
    //set states when discount amount changed
    onChangeDisPercent(e){
        this.setState({
            discountamount: e.target.value
            }
        )
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

    //when submit button clicked
    onSubmit(e){
        e.preventDefault();

        if(this.handleValidate()){
            //Error
            this.setState({
                show:true
            })
        }else{

            const discount =  {
                discountname : this.state.discountname,
                discountamount : this.state.discountamount,
                productname: this.state.productname,
                productId:this.state.pid

            }
            axios.post('http://localhost:5000/discounts/add' , discount )
                .then(res => console.log(res.data));

            axios.post('http://localhost:5000/products/updateDiscount/'+this.state.pid , discount )
                .then(res => console.log(res.data));


            this.handleShow();
            this.setState({
                modelMsg:"Discount Added",
                discountname : "",
                discountamount : 0,

            })
        }


    }
    handleClose(){
        this.setState({
            show:false

        })
        // window.location = '/discount';

    }
    handleShow(){
        this.setState({
            show:true
        })
    }
    backtoDiscount(){
        // window.location = '/discount';
    }
    render() {
        return (

            <div className='container'>



                <Modal show={this.state.show} onHide={this.handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Discount Notifications</Modal.Title>
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
                        <h3 className="card-title">Create New Discount Log</h3>
                    </div>

                    <form role="form" onSubmit={this.onSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Select Product</label>
                                <select ref="userInput"
                                        required
                                        className="form-control mr-5"
                                        value={this.state.productname}
                                        onChange={this.onChangeProductName}>
                                    {
                                        this.state.products.map(function(product) {
                                            return <option
                                                id={product._id}
                                                value={product.productname}
                                            >{product.productname}

                                            </option>;
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Discount Name</label>
                                <input type="text" className="form-control" id="exampleInputPassword1"
                                       placeholder=""  value={this.state.discountname}
                                       onChange={this.onChangeDisName}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Discount Amont</label>
                                <input type="number" className="form-control" id="exampleInputPassword1"
                                       placeholder="" value={this.state.discountamount}
                                       onChange={this.onChangeDisPercent} required/>
                            </div>


                        </div>


                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary" >Submit</button>

                        </div>
                    </form>
                </div>
            </div>
        );
    }




}