import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ShowCategory(){

    const [loading,setLoading]=useState(true);
    const [category,setCategory]=useState([]);
    useEffect(()=>{
        axios.get(`/api/get-category`).then(res=>{
            if(res.data.status===200){
                setCategory(res.data.category);
                setLoading(false);
            }
        });
    },[]);

    if(loading){
        return(<h4>Loading categories...</h4>)
    }else{
        var showCategoryList='';
        showCategoryList=category.map((item,idx)=>{
            return(
            <div className="col-md-4" key={idx}>
                <div className="card">
                    <Link to="/collections">
                        <img src="" className="w-100" alt={item.name}></img>
                    </Link>
                    <div className="card-body">
                        <Link to={`collections/${item.slug}`}>
                    <h5>{item.name}</h5>
                    </Link>
                    </div>
                </div>
            </div>
            )
        });
    }
    return(
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Categories</h6>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showCategoryList}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ShowCategory;