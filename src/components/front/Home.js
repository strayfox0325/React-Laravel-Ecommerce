import React from "react";
import {Link} from "react-router-dom";

function Home() {
 
  return (
    <div>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 font-weight-normal mb-4">
            Welcome to <br/>Izzy Tech Store{" "}
          </h1>
          <p className="lead font-weight-normal">
            You are now logged in as admin. You can go to Admin Dashboard to view and manage products and categories.
            This web shop is still in maintenance process, so certain functionalities will be unavailable or unresponsive.<br/>
            Have a nice day!
          </p>
          <div>
            <Link to="/admin/dashboard" className="btn btn-outline-primary mb-3 px-5">
              Dashboard
            </Link>
          </div>
          <div className="product-device box-shadow d-none d-md-block"></div>
          <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
         
        </div>

        <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
          <div className="bg-primary mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
            <div className="my-3 py-3">
              <h2 className="display-5">Smartphones</h2>
              <p className="lead">Apple | Samsung | Xiaomi</p>
            </div>
          </div>

          <div className="bg-info mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 p-3">
              <h2 className="display-5">Gaming Consoles</h2>
              <p className="lead">Xbox | Playstation | Nintendo Switch</p>
            </div>
          </div>
          <div className="bg-secondary mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
            <div className="my-3 p-3">
              <h2 className="display-5">Audio Devices</h2>
              <p className="lead">Speakers | Airbuds | Microphones</p>
            </div>
          </div>
        </div>

        <footer className="container py-5">
      <div className="row">
        <div className="col-12 col-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="d-block mb-2"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>
          <small className="d-block mb-3 text-muted">&copy; Izzy Tech ltd 2022</small>
        </div>
        <div className="col-6 col-md">
          <h5>Categories</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="/">Smartphones</a></li>
            <li><a className="text-muted" href="/">Speakers</a></li>
            <li><a className="text-muted" href="/">Headphones and Earbuds</a></li>
            <li><a className="text-muted" href="/">Gaming Equipment</a></li>
            <li><a className="text-muted" href="/">Laptops</a></li>
            <li><a className="text-muted" href="/">Home Tech</a></li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Brands</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="/">Apple</a></li>
            <li><a className="text-muted" href="/">Huawei</a></li>
            <li><a className="text-muted" href="/">Samsung</a></li>
            <li><a className="text-muted" href="/">JBL</a></li>
            <li><a className="text-muted" href="/">Sony</a></li>
            <li><a className="text-muted" href="/">Bose</a></li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>About</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="/">Our Team</a></li>
            <li><a className="text-muted" href="/">Locations</a></li>
            <li><a className="text-muted" href="/">Privacy</a></li>
            <li><a className="text-muted" href="/">Terms</a></li>
          </ul>
        </div>
      </div>
    </footer>
      </div>
      );
    </div>
  );
}

export default Home;
