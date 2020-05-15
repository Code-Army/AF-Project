import React, {Component} from "react";
import axios from "axios";
import {storage} from './../../firebase'
import Modal from "react-bootstrap/Modal";

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
            category : '',
            subcategory:'',
            description : '',
            shortdiscription : '',
            price : 0,
            oprice : 0,
            products : [],
            categories : [],
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
        // axios.get('http://localhost:5000/products/')
        //     .then(response => {
        //         if(response.data.length > 0 ) {
        //             this.setState({
        //                 products : response.data.map(product => product.productname),
        //                 productname : response.data[0].productname
        //
        //             })
        //         }
        //     })
        fetch("http://localhost:5000/category/")
            .then((response) => {
                return response.json();
            })
            .then(data => {
                let categories = data.map(category => {
                    return {value: category, display: category}
                });
                this.setState({
                    categories: [{value: '', display: '(Select your favourite team)'}].concat(categories)
                });
            }).catch(error => {
            console.log(error);
        });
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
                        category: this.state.category,
                        subcategory: this.state.subcategory,
                        description: this.state.description,
                        shortdiscription: this.state.shortdiscription,
                        specification: this.state.specification,
                        availability: this.state.availability,
                        price: this.state.price,
                        oprice: this.state.oprice,
                        url1: url1,
                    }

                    console.log(this.state.shortdescription);


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

                <form onSubmit={this.onSubmit} className="ml-5 mr-5">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.productname}
                               onChange={this.onChangeProductName}>


                        </input>

                    </div>
                    <form className="form-inline">
                        <div className="dropdown">
                            <select>
                                {this.state.categories.map((category) => <option key={category.value} value={category.value}>{category.display}</option>)}
                            </select>
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
                    </form>
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
                        <label>Short Discription :</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.shortdiscription}
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
                    <div>
                        <input type = "file"
                               className="mb-3"
                               onChange={this.onChangeImgUpload}
                        />

                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Product Log" className="btn btn-primary" onClick={this.handleShow}/>

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
