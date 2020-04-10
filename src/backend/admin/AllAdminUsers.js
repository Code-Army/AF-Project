import React, {Component} from 'react';
import axios from 'axios';
import UserItem from "./AdminUserItem";

class AllAdminUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[]
        }

        this.deleteUser = this.deleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/createAdminUser/').then(res =>{
            this.setState({users:res.data});
        })
            .catch((err) => {
                console.log(err);
            })
    }

    deleteUser(id){
        axios.delete('http://localhost:5000/createAdminUser/'+id)
            .then(res => console.log(res.data));
        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }


    render() {
        return (
            <div className="container">

                <div className="table-responsive">
                    <table className="table table-hover" >

                        <thead class="thead-light">
                        <tr>

                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Entered Date</th>
                            <th>Updated Date</th>
                            <th></th>



                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(user => {
                                return(
                                    <UserItem deleteUser = {() => this.deleteUser(user.id)}
                                    userItem = {user}

                                    />
                                )
                            })
                        }
                        </tbody>
                    </table>


                </div>


            </div>

        );
    }
}

export default AllAdminUsers;