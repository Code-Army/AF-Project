import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contex/UserContext";

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.customer ? (
          <>
        <h1>Welcome {userData.customer.CUserName}</h1>
          <p>F Name {userData.customer.CFirstName}</p>
          <p>L Name {userData.customer.CLastName}</p>
          <p>E Name {userData.customer.Cemail}</p>
          </>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  );
}
