import React, {Component} from 'react';
import axios from 'axios';
class CreateCategory extends Component {

    constructor(props) {
        super(props);

        this.onchangeName = this.onchangeName.bind(this);
        this.onchangeDescription = this.onchangeDescription.bind(this);
        this.onchangeImage = this.onchangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name:'',
            description:'',
            image:null


        }
    }


    onchangeName(e){
        this.setState({
            name:e.target.value
        })
    }

    onchangeDescription(e){
        this.setState({
            description:e.target.value
        })
    }

    // onchangeImage(e){
    //     this.setState({
    //         image:e.target.files
    //     })
    // }
    onSubmit(e){
        e.preventDefault();
        alert('submit method call')
        const newCategory = {
            name:this.state.name,
            description:this.state.description
        }
        console.log(this.state.name)
        console.log(this.state.description)

        this.setState(
            {
                name:'',
                description:'',
                image:null
            }
        )


        axios.post('http://localhost:5000/createCategory/add'
            , newCategory).then(res => console.log(res.data));
    }




    render() {
        return (
            <div className="container">
                <div className="card col-md-6">
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label  className="bmd-label-floating">Category Name</label>
                                <input type="text" className="form-control" id="name"value={this.state.name} onChange={this.onchangeName} placeholder="Enter category name" required="required"></input>
                            </div>


                            <div className="form-group">
                                <label  className="bmd-label-floating">Description</label>

                                <textarea className="form-control" id="description" rows="5" value={this.state.description} onChange={this.onchangeDescription} placeholder="Enter text"></textarea>
                            </div>
                            <div className="form-group">
                                <label  className="bmd-label-floating">Upload Image</label>
                                <input type="file" className="form-control-file" id="image" ></input>

                            </div>

                            <button type="submit" className="btn btn-primary btn-raised">Submit</button>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default CreateCategory;