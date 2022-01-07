import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function Category() {

  const history=useHistory();
    const[categoryInput,setCategory]=useState({
        slug: '',
        name: '',
        description: '',
        status: '',
        meta_keyword: '',
        meta_desription: '',
        error_list:[],
    });

    const handleInput=(e)=>{
        e.persist();
        setCategory({...categoryInput,[e.target.name]: e.target.value});
    }


    const submitCategory=(e)=>{
        e.preventDefault();
        const data={
            slug:categoryInput.slug,
            name:categoryInput.name,
            description:categoryInput.description,
            status:categoryInput.status,
            meta_keyword:categoryInput.meta_keyword,
            meta_description:categoryInput.meta_desription,
        }
        axios.get("/sanctum/csrf-cookie").then(response => {
        axios.post(`/api/add-category`,data).then(res=>{
            if(res.data.status===200){
                swal("Success","Category Added Successfully","success");
                history.push("/admin/dashboard");
            }else if(res.data.status===400){
                setCategory({...categoryInput,error_list:res.data.errors});
            }
        });
    });
    }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Add Category</h1>
      <form onSubmit={submitCategory} id="category_form">
<ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">Seo Tags</button>
  </li>
</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div className="form-group mb-3">
          <label>Slug</label>
          <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
          <span>{categoryInput.error_list.slug}</span>
        </div>
        <div className="form-group mb-3">
          <label>Name</label>
          <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
          <span>{categoryInput.error_list.name}</span>
        </div>
        <div className="form-group mb-3">
          <label>Description</label>
          <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control" />
          <span>{categoryInput.error_list.description}</span>
        </div>
        <div className="form-group mb-3">
          <label>Status</label>
          <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status}/>
          <span>{categoryInput.error_list.status}</span>
        </div>
      </div>
  <div className="tab-pane fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
          
          <div className="form-group mb-3">
            <label>Meta Keywords</label>
            <textarea name="meta-keyword" onChange={handleInput} value={categoryInput.meta_keyword} className="form-control" />
          </div>
          <div className="form-group mb-3">
            <label>Meta Description</label>
            <textarea name="meta-description" onChange={handleInput} value={categoryInput.meta_description} className="form-control" />
          </div>
      </div>
</div>
<button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
</form>
    </div>
  );
}

export default Category;
