 import React, {Component} from "react";

export default class AddProduct extends Component{
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
        this.setState({
            products : ['test product'],
            productname:'test product'
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

        console.log(item);
       axios.post('http://localhost:5000/product/add' , product)
           .then(res => console.log(res.data));

        window.location = '/';
    }
    render() {
        return (
            <div>
              <h3>Create New Product Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <select ref="productInput"
                                required
                                className="form-control"
                                value={this.state.productname}
                                onChange={this.onChangeProductName}>
                            {
                                this.state.products.map(function (product) {
                                    return<option
                                        key = {product}
                                        value={product}>{product}
                                    </option>

                                })
                            }
                        </select>

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
                        <label>Price :</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.price}
                               onChange={this.onChangePrice}
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
