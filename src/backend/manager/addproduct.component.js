import React, {Component} from "react";
import axios from "axios";
import {storage} from './../../firebase'

export default class AddProduct extends Component{
    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeoPrice = this.onChangeoPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeImgUpload = this.onChangeImgUpload.bind(this);


        this.state = {
            productname : '',
            category : '',
            subcategory:'',
            description : '',
            price : 0,
            oprice : 0,
            products : [],
            url: '',
            image: null

        }

    }
    componentDidMount() {
      axios.get('http://localhost:5000/products/')
          .then(response => {
              if(response.data.length > 0 ) {
                  this.setState({
                      products : response.data.map(product => product.productname),
                      productname : response.data[0].productname

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
        const name = image.name
        console.log(name)
        const uploadtask =  storage.ref("images/"+image.name).put(image);
        uploadtask.on('state_changed',
            (snapshot) =>{

            },
            (error) =>{
                console.log(error)
            },
            () =>{
                storage.ref('images').child(image.name).getDownloadURL().then(url =>{
                    console.log(url);
                    const item = {
                        productname: this.state.productname,
                        category: this.state.category,
                        subcategory: this.state.subcategory,
                        description: this.state.description,
                        price: this.state.price,
                        oprice: this.state.oprice,
                        url: url
                    }

                    console.log(this.state.productname);
                    console.log(this.state.oprice);


                    axios.post('http://localhost:5000/products/add' , item )
                        .then(res => console.log(res.data));


                })
            });


    }
    render() {
        return (
            <div>
              <h3>Create New Product Log</h3>
                <form onSubmit={this.onSubmit}>
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
                                onChange={this.onChangeImgUpload}
                        />

                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Product Log" className="btn btn-primary"/>

                    </div>



                </form>
            </div>
        );
    }


}
