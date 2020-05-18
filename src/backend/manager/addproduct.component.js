import React, {Component} from "react";
import axios from "axios";
import {storage} from './../../firebase'
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form'
import {Row,Col} from "react-bootstrap";

export default class AddProduct extends Component{
    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeShortDescription = this.onChangeShortDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
        this.onChangeSpecifications = this.onChangeSpecifications.bind(this);
        this.onChangeaAvailability= this.onChangeaAvailability.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeoPrice = this.onChangeoPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeImgUpload = this.onChangeImgUpload.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);



        this.state = {
            productname : '',
            subcategory:'',
            description : '',
            shortdiscription : '',
            price : 0,
            oprice : 0,
            subCategories : [],
            categories : [],
            name:'',
            cid:'',
            sid:'',
            url1: '',
            specification:'',
            availability:'',
            image: null,
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

    }

    onChangeImgUpload(e){
        if(e.target.files[0]){
            const image = e.target.files[0];
            console.log(image)
            this.setState(() => ({image}))
        }

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

    onChangeProductName(e){
        this.setState({
                productname: e.target.value
            }
        )
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
    onChangeDescription(e){
        this.setState({
                description: e.target.value
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

        const {image} = this.state;
        const name = image.name;
        console.log(name)
        const uploadtask =  storage.ref("images/"+image.name).put(image);


        uploadtask.on('state_changed',
            (snapshot) =>{

            },
            (error) =>{
                console.log(error)
            },
            () =>{
                storage.ref('images').child(image.name).getDownloadURL().then(url1 =>{
                    console.log(url1);
                    const item = {
                        productname: this.state.productname,
                        category: this.state.name,
                        cid: this.state.cid,
                        sid: this.state.sid,
                        subcategory: this.state.subcategory,
                        description: this.state.description,
                        shortdiscription: this.state.shortdiscription,
                        specification: this.state.specification,
                        availability: this.state.availability,
                        price: this.state.price,
                        oprice: this.state.oprice,
                        url1: url1,
                    }
                    console.log(this.state.subcategory)
                    axios.post('http://localhost:5000/products/add' , item )
                        .then(res => console.log(res.data));

                    this.setState({
                        productname : "",
                        category : "",
                        subcategory:"",
                        description :"",
                        shortdiscription : "",
                        price : 0,
                        oprice : 0,
                        specification:"",
                        availability:"",

                    })


                })
            });


    }
    render() {
        return (

            <div className="container">
                <h3>Create New Product Log</h3>

                <Form onSubmit={this.onSubmit} className="ml-5 mr-5">

                        <Row className="mb-3" >
                            <Col>
                                <Form.Control placeholder="Product name" value={this.state.productname} onChange={this.onChangeProductName}/>
                            </Col>
                            <Col>
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
                                </div>
                            </Col>
                        </Row>
                    <Row>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Control placeholder="Description" value={this.state.description} onChange={this.onChangeDescription} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Control placeholder="Short Discription " value={this.state.shortdiscription} onChange={this.onChangeShortDescription} />
                        </Form.Group>

                    </Row>

                    <Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Control placeholder="Availability" value={this.state.availability} onChange={this.onChangeaAvailability} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Control placeholder="Specification" value={this.state.specification} onChange={this.onChangeSpecifications}/>
                        </Form.Group>
                </Row>
                    <Row>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Unit Price</Form.Label>
                            <Form.Control value={this.state.price} onChange={this.onChangePrice}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Original Price</Form.Label>
                            <Form.Control value={this.state.oprice} onChange={this.onChangeoPrice}/>
                        </Form.Group>
                </Row>


                    <div>
                        <input type = "file"
                               className="mb-3 mt-3 "
                               onChange={this.onChangeImgUpload}
                        />

                    </div>
                    <div className="form-group float-right">
                        <input type="submit" value="Create Product Log" className="btn btn-primary" onClick={this.handleShow}/>

                    </div>
                </Form>
                <br/>
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



                {/*<div className="form-inline">*/}
                {/*    <div className="form-group ">*/}
                {/*        <label>Product Name : </label><br/>*/}
                {/*       <br/> <input type="text"*/}
                {/*               required*/}
                {/*               className="form-control ml-3 mr-3"*/}
                {/*               value={this.state.productname}*/}
                {/*               onChange={this.onChangeProductName}>*/}


                {/*        </input>*/}
                {/*        <form className="form-inline ml-5">*/}
                {/*            <div className="dropdown">*/}
                {/*                <select ref="userInput"*/}
                {/*                        required*/}
                {/*                        className="form-control ml-3 mr-3"*/}
                {/*                        value={this.state.name}*/}
                {/*                        onChange={this.onChangeCategory}>*/}
                {/*                    {*/}
                {/*                        this.state.categories.map(function(category) {*/}
                {/*                            return <option*/}
                {/*                                key={category}*/}
                {/*                                value={category}>{category}*/}
                {/*                            </option>;*/}
                {/*                        })*/}
                {/*                    }*/}
                {/*                </select>*/}
                {/*            </div>*/}


                {/*            <div className="dropdown ml-3 ">*/}

                {/*                <select ref="userInput"*/}
                {/*                        required*/}
                {/*                        className="form-control ml-3 mr-3"*/}
                {/*                        value={this.state.subcategory}*/}
                {/*                        onChange={this.onChangeSubCategory}>*/}
                {/*                    {*/}
                {/*                        this.state.subCategories.map(function(scategory) {*/}
                {/*                            return <option*/}
                {/*                                key={scategory}*/}
                {/*                                value={scategory}>{scategory}*/}
                {/*                            </option>;*/}
                {/*                        })*/}
                {/*                    }*/}
                {/*                </select>*/}
                {/*            </div>*/}
                {/*        </form>*/}

                {/*        <label>Description :</label>*/}
                {/*        <input type="text"*/}
                {/*               required*/}
                {/*               className="form-control ml-3 mr-3"*/}
                {/*               value={this.state.description} onChange={this.onChangeDescription}*/}
                {/*        />*/}

                {/*            <label>Short Discription :</label>*/}
                {/*            <input type="text"*/}
                {/*                   required*/}
                {/*                   className="form-control ml-3 mr-3"*/}
                {/*                   value={this.state.shortdiscription} onChange={this.onChangeShortDescription}*/}
                {/*            />*/}


                {/*    </div>*/}
                {/*    <div className="form-group  d-inline">*/}
                {/*        <label>Availability :</label>*/}
                {/*        <input type="text"*/}
                {/*               required*/}
                {/*               className="form-control ml-3 mr-3"*/}
                {/*               value={this.state.availability} onChange={this.onChangeaAvailability}*/}
                {/*        />*/}
                {/*        <label>Specification :</label>*/}
                {/*        <input type="text"*/}
                {/*               required*/}
                {/*               className="form-control ml-3 mr-3"*/}
                {/*               value={this.state.specification} onChange={this.onChangeSpecifications}*/}
                {/*        />*/}

                {/*        <label>Unit Price :</label>*/}
                {/*        <input type="text"*/}
                {/*               required*/}
                {/*               className="form-control ml-3 mr-3"*/}
                {/*               value={this.state.price} onChange={this.onChangePrice}*/}
                {/*        />*/}
                {/*        <label>Original price :</label>*/}
                {/*        <input type="text"*/}
                {/*               required*/}
                {/*               className="form-control ml-3 mr-3"*/}
                {/*               value={this.state.oprice} onChange={this.onChangeoPrice}*/}
                {/*        />*/}

                {/*    </div>*/}

                {/*</div>*/}








            </div>
        );
    }


}
