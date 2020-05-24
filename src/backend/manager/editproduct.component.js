import React, {Component} from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {Row,Col} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import {storage} from "../../firebase";


export default class editproduct extends Component{
    constructor(props) {
        super(props);

        //bind method
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


        //set initial state
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
            show:false,
            newImg:false,
            image: null,
            modelMsg:'',
            error:false,
            uploading:"false"


        }

    }
    //get the products,categories and sub categories from database for selected id
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


                    axios.get(`http://localhost:5000/SubCategory/category_by_id?id=${response.data[0]._id}&type=single`)
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
            })


        axios.get('http://localhost:5000/products/' + this.props.id)
            .then(response => {
                this.setState({
                    productname: response.data.productname,
                    description: response.data.description,
                    shortdiscription: response.data.shortdiscription,
                    specification: response.data.specification,
                    availability: response.data.availability,
                    price: response.data.price,
                    oprice: response.data.oprice,
                    img:response.data.url1,
                    discount:response.data.discount

                })

            })
            .catch(function (error) {
                console.log(error)

            })


    }
    //set states when category name changed
    onChangeCategory(e){

        var selectedIndex = e.target.options.selectedIndex;
        this.setState({
                name: e.target.value,
                cid:e.target.options[selectedIndex].getAttribute('id')
            }
        )

        axios.get(`http://localhost:5000/SubCategory/category_by_id?id=${e.target.options[selectedIndex].getAttribute('id')}&type=single`)
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
    //set states when sub category name changed
    onChangeSubCategory(e){

        var selectedIndex = e.target.options.selectedIndex;
        this.setState({
                subcategory: e.target.value,
                sid:e.target.options[selectedIndex].getAttribute('id')
            }
        )
    }
    //set states when product name changed
    onChangeProductName(e){
        this.setState({
                productname: e.target.value
            }
        )
    }
    //set states when description name changed
    onChangeDescription(e){
        this.setState({
                description: e.target.value
            }
        )
    }
    //set states when specification name changed
    onChangeSpecifications(e){
        this.setState({
                specification: e.target.value
            }
        )
    }
    //set states when availability name changed
    onChangeaAvailability(e){
        this.setState({
                availability: e.target.value
            }
        )
    }
    //set states when short description name changed
    onChangeShortDescription(e){
        this.setState({
                shortdiscription: e.target.value
            }
        )
    }
    //set states when price ] changed
    onChangePrice(e){
        this.setState({
                price: e.target.value
            }
        )
    }
    //set states when original price changed
    onChangeoPrice(e){
        this.setState({
                oprice: e.target.value
            }
        )
    }

    //Validate Text boxes
    handleValidate(){

        let error = false;
        let errMsg = "";
        if (this.state.productname == ''){
            error = true;
            errMsg = "Required Product Name"
        }else if( this.state.subcategory == ''){
            error = true;
            errMsg = "Required Sub Category"
        }else if(this.state.description == ''){
            error = true;
            errMsg = "Required Description"
        }else if(this.state.shortdiscription == ''){
            error = true;
            errMsg = "Required Short Description"
        }else if (this.state.specification == ''){
            error = true;
            errMsg = "Required Specification"
        }else if(this.state.availability == ''){
            error = true;
            errMsg = "Required Availability"
        }else if(this.state.price == ''){
            error = true;
            errMsg = "Required Unit Price"
        }else if (this.state.oprice == ''){
            error = true;
            errMsg = "Required Original Price"
        }else if (this.state.imgName == ''){
            error = true;
            errMsg = "Please Insert The Image"
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
                show:true
            })
        }else{

            if(this.state.newImg){
                const {image} = this.state;
                const name = image.name;
                console.log(name)
                const uploadtask =  storage.ref("images/"+image.name).put(image);
                this.setState({
                    uploading:"pending"
                })

                uploadtask.on('state_changed',
                    (snapshot) =>{

                    },
                    (error) =>{
                        console.log(error)
                    },
                    () =>{
                        storage.ref('images').child(image.name).getDownloadURL().then(url1 =>{
                            console.log(url1)
                            const item = {
                                productname: this.state.productname,
                                description: this.state.description,
                                shortdiscription: this.state.shortdiscription,
                                category: this.state.name,
                                cid: this.state.cid,
                                sid: this.state.sid,
                                subcategory: this.state.subcategory,
                                specification: this.state.specification,
                                availability: this.state.availability,
                                price: this.state.price,
                                oprice: this.state.oprice,
                                url1: url1,
                            }

                            axios.post('http://localhost:5000/products/update/' + this.props.id , item )
                                .then(res => console.log(res.data));





                        })
                    });


            }else{
                const item = {
                    productname: this.state.productname,
                    description: this.state.description,
                    shortdiscription: this.state.shortdiscription,
                    category: this.state.name,
                    cid: this.state.cid,
                    sid: this.state.sid,
                    subcategory: this.state.subcategory,
                    specification: this.state.specification,
                    availability: this.state.availability,
                    price: this.state.price,
                    oprice: this.state.oprice,
                    url1:this.state.img
                }
                axios.post('http://localhost:5000/products/update/' + this.props.id , item )
                    .then(res => console.log(res.data));


            }

            this.setState({
                uploading:"false",
                show:true,
                modelMsg:"Product Update Sucessfully.",


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
    handleBack(){
        // window.location = '/products'
    }

    onImgChange(e){
        var file = this.refs.file.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({
                img: [reader.result],
                newImg:true
        })
        }.bind(this);

        if(e.target.files[0]){
            const image = e.target.files[0];
            this.setState(() => ({image}))
        }

    }
    render() {

        const imgstyle={
            height:"150px",
            width:"150px"
        }
        return (
            <div className="container" >

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Product Update Notification</Modal.Title>
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




                <div className="card card-warning">
                    <div className="card-header">
                        <h3 className="card-title">Update Products</h3>
                    </div>

                    <div className="card-body">
                        <form role="form" onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-sm-6">

                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input type="text" className="form-control" placeholder="Enter ..." value={this.state.productname}  onChange={this.onChangeProductName}/>
                                    </div>

                                </div>

                                <div className="col-sm-6">

                                    <div className="form-group">

                                          </div>

                                </div>

                            </div>

                            <div className="row">
                                <div className="col-sm-6">

                                    <div className="form-group">
                                        <label>Product Image</label>
                                        <input ref="file"
                                               type="file"
                                               name="user[image]"
                                               multiple="true" className="form-control" onChange={this.onImgChange.bind(this)} placeholder="Enter ..." />
                                    </div>

                                </div>

                                <div className="col-sm-6">

                                    <div className="form-group">
                                        <img style={imgstyle} src={this.state.img}/>
                                    </div>

                                </div>

                            </div>

                            {/*<div className="form-group">*/}
                            {/*    <label>Product Image</label>*/}
                            {/*    <input type="file" className="form-control" placeholder="Enter ..."/>*/}
                            {/*</div>*/}
                            <div className="row">
                                <div className="col-sm-6">

                                    <div className="form-group">
                                        <label>Category</label>
                                        <select className="form-control"
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
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Sub Category</label>
                                        <select className="form-control" value={this.state.subcategory}
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
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">

                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" rows="3" placeholder="Enter ..." value={this.state.description} onChange={this.onChangeDescription}></textarea>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Short Description</label>
                                        <textarea className="form-control" rows="3" placeholder="Enter ..."
                                                  value={this.state.shortdiscription} onChange={this.onChangeShortDescription}  ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">

                                    <div className="form-group">
                                        <label>Availability</label>
                                        <input type="text" className="form-control" placeholder="Enter ..." value={this.state.availability} onChange={this.onChangeaAvailability}/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Specification</label>
                                        <input type="text" className="form-control" placeholder="Enter ..." value={this.state.specification} onChange={this.onChangeSpecifications}/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">

                                    <div className="form-group">
                                        <label>Unit Price</label>
                                        <input type="number" className="form-control" placeholder="Enter ..." value={this.state.price} onChange={this.onChangePrice} required/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Original Price</label>
                                        <input type="number" className="form-control" placeholder="Enter ..." value={this.state.oprice} onChange={this.onChangeoPrice} required/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">

                                <div className="col-sm-3">

                                    <div className="form-group">
                                        <label>Discount</label>
                                        <input type="text" className="form-control" placeholder="Enter ..." value={this.state.discount} onChange={this.onChangePrice} disabled/>
                                    </div>
                                </div>

                                <div className="col-sm-3">

                                    <div className="form-group">
                                        <label>Current Price</label>
                                        <input type="text" className="form-control" placeholder="Enter ..." value={this.state.price - this.state.discount} onChange={this.onChangePrice} disabled/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">

                                    <button type="submit" className="btn btn-primary">Update</button>
                                    {this.state.uploading == "pending" ? <div class="spinner-border text-primary" role="status">
                                        <span class="sr-only"></span><p></p>
                                    </div> :""}
                                </div>

                            </div>
                        </form>
                    </div>

                </div>

            </div>
        );
    }


}
