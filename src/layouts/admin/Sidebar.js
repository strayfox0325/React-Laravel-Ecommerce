import React from 'react';
import {Link} from 'react-router-dom';


const Sidebar = () =>{
    return(

        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Admin</div>
                            <Link className="nav-link" to="/admin/dashboard">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </Link>
                            <Link className="nav-link" to="/admin/profile">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Profile
                            </Link>
                            <Link className="nav-link" to="/">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Home
                            </Link>
                            <div className="sb-sidenav-menu-heading">Management</div>
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseCategories" aria-expanded="false" aria-controls="collapseCategores">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Categories
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="collapseCategories" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/admin/add-category">Add Category</Link>
                                    <Link className="nav-link" to="/admin/show-category">Show Categories</Link>
                                </nav>
                            </div>
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseProducts" aria-expanded="false" aria-controls="collapseProducts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Products
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="collapseProducts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/admin/add-product">Add Product</Link>
                                    <Link className="nav-link" to="/admin/show-product">Show Products</Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        Isidora Lazic
                    </div>
                </nav>

    );

}
export default Sidebar;