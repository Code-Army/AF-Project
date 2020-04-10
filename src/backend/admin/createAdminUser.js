import React, {Component} from 'react';
import axios from 'axios';
class CreateAdminUser extends Component {
    constructor(props) {
        super(props);

        this.onchangeName = this.onchangeName.bind(this);
        this.onchangeEmail = this.onchangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name:'',
            email:'',
            users:[]

        }
    }


    onchangeName(e){
        this.setState({
            name:e.target.value
        })
    }

    onchangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const newUser = {
            name:this.state.name,
            email:this.state.email
        }
        console.log(this.state.name)
        console.log(this.state.email)

        this.setState(
            {
                name:'',
                email:'',
            }
        )


        axios.post('http://localhost:5000/createAdminUser/add'
            , newUser).then(res => console.log(res.data));
    }



    render() {
        return (

            <div className="first">
                <br/><br/>
                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6 pb-5">




                            <form onSubmit={this.onSubmit}>
                                <div className="card  rounded">
                                    <div className="card-header rounded p-0">
                                        <div className="bg-info text-white text-center py-2">
                                            <h3><i className="fa fa-user-plus"></i> Create Admin User Accounts</h3>

                                        </div>
                                    </div>
                                    <div className="card-body rounded p-3">


                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><i
                                                        className="fa fa-user text-info"></i></div>
                                                </div>
                                                <input type="text" className="form-control" id="name" name="username" value={this.state.name} onChange={this.onchangeName}
                                                       placeholder="Enter Name" required></input>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><i
                                                        className="fa fa-envelope text-info"></i></div>
                                                </div>
                                                <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.onchangeEmail}
                                                       placeholder="Enter the email" required></input>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <input type="submit" value="Submit" className="btn btn-info btn-block rounded py-2"></input>
                                        </div>
                                    </div>

                                </div>
                            </form>



                        </div>
                    </div>
                </div>

                <br/>



            </div>




        );
    }
}

export default CreateAdminUser;