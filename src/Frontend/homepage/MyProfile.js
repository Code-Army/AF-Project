import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contex/UserContext";
import Header from "./Header";


export default function MyProfile() {
    const { userData } = useContext(UserContext);

    return (
        <div className="page">
            {userData.customer ? (
                <>
                    <Header/>
                    <h1>Welcome {userData.customer.CUserName}</h1>
                    <p>F Name {userData.customer.CFirstName}</p>
                    <p>L Name {userData.customer.CLastName}</p>
                    <p>E Name {userData.customer.Cemail}</p>
                </>
            ) : (
                <>  <Header/>
                    <h2>You are not logged in</h2>
                    <Link to="/login">Log in</Link>
                </>
            )}
        </div>
    );
}
