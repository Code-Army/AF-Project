import React, {Component} from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {Row,Col} from "react-bootstrap";
import Form from 'react-bootstrap/Form'


export default class editproduct extends Component{
    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeoPrice = this.onChangeoPrice.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
        this.onChangeShortDescription = this.onChangeShortDescription.bind(this);
        this.onChangeSpecifications = this.onChangeSpecifications.bind(this);
        this.onChangeaAvailability= this.onChangeaAvailability.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);



        this.state = {
            productname : '',
            subCategories : [],
            categories : [],
            name:'',
            subcategory:'',
            cid:'',
            sid:'',
            description : '',
            shortdiscription : '',
            specification:'',
            availability:'',
            price : 0,
            oprice : 0,
            products : [],
            show:false


        }

    }
    componentDidMount() {
        axios.get('http://localhost:5000/Category/')
            .then(response => {
                if(response.data.length > 0 ) {
                    this.setState({
                        // categories : response.data.map(category => category.name),
                        categories:response.data,
                        name : response.data[0].name,
                        cid:response.data[0]._id

                    })
                }
            })
        axios.get('http://localhost:5000/createSubCategory/')
            .then(response => {
                if(response.data.length > 0 ) {
                    this.setState({
                        subCategories:response.data,
                        subcategory : response.data[0].name,
                        sid:response.data[0]._id


                    })

                }
            })
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    productname: response.data.productname,
                    description: response.data.description,
                    shortdiscription: response.data.shortdiscription,
                    specification: response.data.specification,
                    availability: response.data.availability,
                    price: response.data.price,
                    size: response.data.size,
                    oprice: response.data.oprice,

                })

            })
            .catch(function (error) {
                console.log(error)

            })


    }
    onChangeCategory(e){
        console.log(e.target.name)
        console.log("um")
        var selectedIndex = e.target.options.selectedIndex;
        console.log("id - "+e.target.options[selectedIndex].getAttribute('id'))
        this.setState({
                name: e.target.value,
                cid:e.target.options[selectedIndex].getAttribute('id')
            }
        )
        // console.log(e.target.cid)
    }
    onChangeSubCategory(e){
        console.log(e.target.name)
        console.log("um")
        var selectedIndex = e.target.options.selectedIndex;
        console.log("id - "+e.target.options[selectedIndex].getAttribute('id'))
        this.setState({
                subcategory: e.target.value,
                sid:e.target.options[selectedIndex].getAttribute('id')
            }
        )
    }

    onChangeProductName(e){
        this.setState({
                productname: e.target.value
            }
        )
    }
    onChangeDescription(e){
        this.setState({
                description: e.target.value
            }
        )
    }
    onChangeSpecifications(e){
        this.setState({
                specification: e.target.value
            }
        )
    }
    onChangeaAvailability(e){
        this.setState({
                availability: e.target.value
            }
        )
    }
    onChangeShortDescription(e){
        this.setState({
            shortdiscription: e.target.value
            }
        )
    }
    onChangePrice(e){
        this.setState({
                price: e.target.value
            }
        )
    }
    onChangeoPrice(e){
        this.setState({
                oprice: e.target.value
            }
        )
    }
    onSubmit(e){
        e.preventDefault();

        const item = {
            productname: this.state.productname,
            description: this.state.description,
            shortdiscription: this.state.shortdiscription,
            category: this.state.name,
            cid: this.state.cid,
            sid: this.state.sid,
            size: this.state.size,
            subcategory: this.state.subcategory,
            specification: this.state.specification,
            availability: this.state.availability,
            price: this.state.price,
            oprice: this.state.oprice,
        }

        axios.post('http://localhost:5000/products/update/' + this.props.match.params.id , item )
            .then(res => console.log(res.data));
        this.setState({
            productname : "",
            description :"",
            subcategory:"",
            price : 0,
            oprice : 0,
            specification:"",
            availability:"",
            show:false
        })
        window.location = '/products'


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
    handleBack(){
       window.location = '/products'
    }
    render() {
        return (
            <div className="container" >
                <div >
                    <h3 className="header ml-3 ">Edit  Product Log</h3>
                    <Row className="mb-3 mt-3">

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control value={this.state.productname}  onChange={this.onChangeProductName}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Select :</Form.Label>
                            <div className="form-inline">
                                <select ref="userInput"
                                        required
                                        className="form-control mr-5"
                                        value={this.state.name}
                                        onChange={this.onChangeCategory}>
                                    {
                                        this.state.categories.map(function(category) {
                                            return <option
                                                key={category}
                                                value={category.name}
                                                id={category._id}
                                            >{category.name}

                                            </option>;
                                        })
                                    }
                                </select>
                                <select ref="userInput"
                                        required
                                        className="form-control  mr-3"
                                        value={this.state.subcategory}
                                        onChange={this.onChangeSubCategory}>
                                    {
                                        this.state.subCategories.map(function(scategory) {
                                            return <option
                                                key={scategory}
                                                value={scategory.name}
                                                id={scategory._id}
                                            >{scategory.name}
                                            </option>;
                                        })
                                    }
                                </select>
                                <select id="dropdown" value={this.state.size} onChange={(e) => this.setState({size: e.target.value})} className="btn-light p-2 ">
                                    <option>Select Size</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                            </div>
                        </Form.Group>


                    </Row>
                    <Row className="mb-3 mt-3">

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control  value={this.state.description} onChange={this.onChangeDescription}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control  value={this.state.shortdiscription} onChange={this.onChangeShortDescription} />
                        </Form.Group>


                    </Row>
                    <Row className="mb-3 mt-3">

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Availability</Form.Label>
                            <Form.Control  value={this.state.availability} onChange={this.onChangeaAvailability}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Specification</Form.Label>
                            <Form.Control value={this.state.specification} onChange={this.onChangeSpecifications} />
                        </Form.Group>


                    </Row>
                    <Row className="mb-3 mt-3">
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Unit Price</Form.Label>
                            <Form.Control value={this.state.price} onChange={this.onChangePrice}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Original Price</Form.Label>
                            <Form.Control value={this.state.oprice} onChange={this.onChangeoPrice}/>
                        </Form.Group>

                    </Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <div className="form-group float-right mt-5 form-inline">
                            <button className="btn btn-dark mr-3" onClick={this.handleBack}>back</button>
                            <button className="btn btn-primary" onClick={this.handleShow}>Edit Product Log</button>

                        </div>
                    </Form.Group>

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
                        <button variant="primary"className="btn btn-danger" onClick={this.onSubmit}>
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>


                {/*<h3 className="header ml-3 ">Edit  Product Log</h3>*/}
                {/*<div className="ml-3 mr-3">*/}
                {/*    <div className="form-group">*/}
                {/*        <label>Product Name</label>*/}
                {/*        <input type="text"*/}
                {/*               required*/}
                {/*               className="form-control"*/}
                {/*               value={this.state.productname}  onChange={this.onChangeProductName}>*/}


                {/*        </input>*/}

                {/*    </div>*/}

                {/*    <div className="form-group">*/}
                {/*        <label>Description :</label>*/}
                {/*        <input type="text"*/}
                {/*               required*/}
                {/*               className="form-control"*/}
                {/*               value={this.state.description} onChange={this.onChangeDescription}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="form-group">*/}
                {/*        <label>Short Description :</label>*/}
                {/*        <input type="text"*/}
                {/*               required*/}
                {/*               readOnly={false}*/}
                {/*               className="form-control"*/}
                {/*               value={this.state.shortdiscription} onChange={this.onChangeShortDescription}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="form-group">*/}
                {/*        <label>Availability :</label>*/}
                {/*        <input type="text"*/}
                {/*               required*/}
                {/*               className="form-control"*/}
                {/*               value={this.state.availability} onChange={this.onChangeaAvailability}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="form-group">*/}
                {/*        <label>Specification :</label>*/}
                {/*        <input type="text"*/}
                {/*               required*/}
                {/*               className="form-control"*/}
                {/*               value={this.state.specification} onChange={this.onChangeSpecifications}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="form-group">*/}
                {/*        <label>Unit Price :</label>*/}
                {/*        <input type="text"*/}
                {/*               required*/}
                {/*               className="form-control"*/}
                {/*               value={this.state.price} onChange={this.onChangePrice}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="form-group">*/}
                {/*        <label>Original price :</label>*/}
                {/*        <input type="text"*/}
                {/*               required*/}
                {/*               className="form-control"*/}
                {/*               value={this.state.oprice} onChange={this.onChangeoPrice}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="form-group">*/}
                {/*        <button className="btn btn-primary" onClick={this.handleShow}>Edit Product Log</button>*/}

                {/*    </div>*/}



                {/*</div>*/}
                {/*<Modal show={this.state.show}>*/}
                {/*    <Modal.Header closeButton>*/}
                {/*        <Modal.Title>notofication</Modal.Title>*/}
                {/*    </Modal.Header>*/}
                {/*    <Modal.Body>data update successfull.</Modal.Body>*/}
                {/*    <Modal.Footer>*/}
                {/*        <button variant="secondary" className="btn btn-success " onClick={this.handleClose}>*/}
                {/*            Close*/}
                {/*        </button>*/}
                {/*        <button variant="primary"className="btn btn-danger" onClick={this.onSubmit}>*/}
                {/*            Save Changes*/}
                {/*        </button>*/}
                {/*    </Modal.Footer>*/}
                {/*</Modal>*/}
            </div>
        );
    }


}
