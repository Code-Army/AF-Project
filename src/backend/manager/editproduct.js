import React, {Component} from "react";
import axios from "axios";

export default class editproduct extends Component{
    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);



        this.state = {
            productname : '',
            description : '',
            price : 0,
            products : []

        }

    }
    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    productname: response.data.productname,
                    description: response.data.description,
                    price: response.data.price,

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
    onChangePrice(e){
        this.setState({
                price: e.target.value
            }
        )
    }
    onSubmit(e){
        e.preventDefault();
        const item = {
            productname: this.state.productname,
            description: this.state.description,
            price: this.state.price
        }

        console.log(this.state.productname);
        console.log(this.state.description);


        axios.post('http://localhost:5000/products/update/' + this.props.match.params.id , item )
            .then(res => console.log(res.data));

    }
    render() {
        return (
            <div>
                <h3>Edit  Product Log</h3>
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
                               value={this.state.price}
                               onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Product Log" className="btn btn-primary"/>

                    </div>



                </form>
            </div>
        );
    }


}
