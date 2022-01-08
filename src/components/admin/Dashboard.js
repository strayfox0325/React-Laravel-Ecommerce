import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {

  return (
         <div className="col-md-5 p-lg-5 mx-auto my-5">
        <h1 className="display-4 font-weight-normal mb-4">
          Welcome to <br />
          Your Dashboard{" "}
        </h1>
        <p className="lead font-weight-normal">
          You are now logged in as admin. Go to Admin Dashboard to view
          and manage products and categories. Ourweb shop is still in
          maintenance process, so certain functionalities will be unavailable or
          unresponsive.
          <br />
          Have a nice day!
        </p>
        <div>
          <Link to="/" className="btn btn-outline-primary mb-3 px-5">
            Home
          </Link>
        </div>
        <div className="product-device box-shadow d-none d-md-block"></div>
        <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
      </div>
   
  );
}

export default Dashboard;
