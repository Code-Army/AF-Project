import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../Authentication/Auth";

export default function Header() {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">Dashboard</h1>
      </Link>
      <Auth />
    </header>
  );
}
