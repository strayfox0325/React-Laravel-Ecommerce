import axios from "axios";
import React, { useEffect,useState } from "react";
import {Link} from 'react-router-dom';


function ShowCategory() {

const[loading,setLoading]=useState(true);
const[categorylist,setCategorylist]=useState([]);

useEffect(()=>{

        axios.get(`/api/show-category`).then(res=>{
            if(res.data.status===200){
                setCategorylist(res.data.category);
            }
            setLoading(false);
        });
},[]);

var showcategory_HTMLTABLE="";
if(loading){
    return <h4>Loading category...</h4>
}else{
    showcategory_HTMLTABLE=categorylist.map((item)=>{
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>{item.status}</td>
                <td>
                    <Link to={`edit-category/${item.id}`} className="btn btn-success btn-sm=">Edit</Link>
                </td>
                <td>
                    <button type="button" className="btn btn-danger btn-sm=">Delete</button>
                </td>
            </tr>
        )
    });
}

  return(
      <div className="container px-4">
          <div className="card mt-4">
          <div className="vard-header">
                <h4>Category List
                    <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">Add Category</Link>
                </h4>
          </div>
          <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {showcategory_HTMLTABLE}
                    </tbody>
                </table>
          </div>
      </div>
    </div>
  )
}

export default ShowCategory;
