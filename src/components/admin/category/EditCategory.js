import axios from "axios";
import React, { useEffect,useState } from "react";
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

function EditCategory(props) {


    const history=useHistory();
    const[loading,setLoading]=useState(true);
    const[categoryInput,setCategory]=useState({});
    const [error,setError]=useState([]);

    useEffect(()=>{
        const category_id=props.match.params.id;
        axios.get(`/api/edit-category/${category_id}`).then(res=>{
           if(res.data.status===200){
               setCategory(res.data.category);
           }else if(res.data.status===404){
                swal("Error",res.data.message,"error");
                history.push('/admin/show-category');
           }
           setLoading(false);
        });
},[props.match.params.id,history]);

    const handleInput=(e)=>{
        e.persist();
        setCategory({...categoryInput,[e.target.name]: e.target.value});
    }

    const updateCategory=(e)=>{
        e.preventDefault();

        const category_id=props.match.params.id;
        const data=categoryInput;
        axios.put(`/api/update-category/${category_id}`,data).then(res=>{
            if(res.data.status===200){
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/admin/show-category');
            }else if(res.data.status===422){
                swal("All fields must be filled","","warning");
                setError(res.data.errors);
            }else if(res.data.status===404){
                swal("Error",res.data.message,"error");
                history.push('/admin/show-category');
            }
        });
    }

    if(loading){
        return <h4>Loading category data...</h4>
    }

  return (
    <div className="container px-4">
      <Link to="/admin/show-category" className="btn btn-primary btn-sm">Back</Link>
      <form onSubmit={updateCategory}>
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
          <span className="text-danger">{error.slug}</span>
        </div>
        <div className="form-group mb-3">
          <label>Name</label>
          <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
          <span className="text-danger">{error.name}</span>
        </div>
        <div className="form-group mb-3">
          <label>Description</label>
          <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control" />
        </div>
        <div className="form-group mb-3">
          <label>Status</label>
          <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status}/>
          <span className="text-danger">{error.status}</span>
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
<button type="submit" className="btn btn-primary px-4 float-end">Update</button>
</form>
    </div>
  );
}

export default EditCategory;
