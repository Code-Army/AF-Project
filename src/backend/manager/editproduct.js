import React, {Component} from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";


export default class editproduct extends Component{
    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeoPrice = this.onChangeoPrice.bind(this);
        this.onChangeShortDescription = this.onChangeShortDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
        this.onChangeSpecifications = this.onChangeSpecifications.bind(this);
        this.onChangeaAvailability= this.onChangeaAvailability.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);



        this.state = {
            productname : '',
            description : '',
            category : '',
            subcategory:'',
            shortdescription : '',
            specification:'',
            availability:'',
            price : 0,
            oprice : 0,
            products : [],
            show:false


        }

    }
    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    productname: response.data.productname,
                    description: response.data.description,
                    shortdiscription: response.data.shortdescription,
                    specification: response.data.specification,
                    availability: response.data.availability,
                    price: response.data.price,
                    oprice: response.data.oprice,

                })


            })
            .catch(function (error) {
                console.log(error)

            })

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
                shortdescription: e.target.value
            }
        )
    }
    onChangeCategory(e){
        this.setState({
                category: e.target.value
            }
        )
    }
    onChangeSubCategory(e){
        this.setState({
                subcategory: e.target.value
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
            category: this.state.category,
            subcategory: this.state.subcategory,
            description: this.state.description,
            shortdescription: this.state.shortdescription,
            specification: this.state.specification,
            availability: this.state.availability,
            price: this.state.price,
            oprice: this.state.oprice,
        }

        console.log(this.state.productname);
        console.log(this.state.description);


        axios.post('http://localhost:5000/products/update/' + this.props.match.params.id , item )
            .then(res => console.log(res.data));
        this.setState({
            productname : "",
            category : "",
            subcategory:"",
            description :"",
            shortdescription : "",
            price : 0,
            oprice : 0,
            specification:"",
            availability:"",
            show:false
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
    render() {
        return (
            <div className="container" >
                <h3 className="header ml-3 ">Edit  Product Log</h3>
                <div className="ml-3 mr-3">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.productname}
                               onChange={this.onChangeProductName}>


                        </input>

                    </div>
                    <div className="form-inline">
                        <div className="dropdown">
                            <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Select Category
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                        <div className="dropdown">
                            <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Select Sub Category
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description :</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.description}
                               onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Short Description :</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.shortdescription}
                               onChange={this.onChangeShortDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Availability :</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.availability}
                               onChange={this.onChangeaAvailability}
                        />
                    </div>
                    <div className="form-group">
                        <label>Specification :</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.specification}
                               onChange={this.onChangeSpecifications}
                        />
                    </div>
                    <div className="form-group">
                        <label>Unit Price :</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.price}
                               onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                        <label>Original price :</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.oprice}
                               onChange={this.onChangeoPrice}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.handleShow}>Edit Product Log</button>

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
                        <button variant="primary" onClick={this.onSubmit}>
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }


}
