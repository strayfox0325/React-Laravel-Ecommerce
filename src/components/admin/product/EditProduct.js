import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link,useHistory } from "react-router-dom";

function EditProduct(props) {

  const history=useHistory();
  const[loading,setLoading]=useState(true);
  const[image,setImage]=useState([]);
  const[error,setError]=useState([]);
  const[categorylist,setCategorylist]=useState([]);
    const[productInput,setProduct]=useState({
        category_id: '',
        slug: '',
        name: '',
        description: '',

        meta_title: '',
        meta_keyword: '',
        meta_desription: '',

        selling_price: '',
        original_price: '',
        qty: '',
        brand: '',
        featured: '',
        popular: '',
        status: '',

    });


    const handleImage=(e)=>{
      e.persist();
      setImage({image:e.target.files[0]});
  }
    const handleInput=(e)=>{
        e.persist();
        setProduct({...productInput,[e.target.name]: e.target.value});
    }

    useEffect(()=>{
      document.title='Izzy Tech | Edit Product';


      axios.get(`/api/all-category`).then(res=>{
          if(res.data.status===200){
              setCategorylist(res.data.category);
          }
          setLoading(false);
      });
      
      const product_id=props.match.params.id;
      axios.get(`/api/edit-product/${product_id}`).then(res=>{
        if(res.data.status===200){
            setProduct(res.data.product);
        }else if(res.data.status===404){
            swal("Error",res.data.message,"error");
            history.push('/admin/show-product');
        }
        setLoading(false);
      });
},[props.match.params.id,history]);


const updateProduct=(e)=>{
    e.preventDefault();
    const product_id=props.match.params.id;

    const formData=new FormData();
    formData.append('image',image.image);
    formData.append('category_id',productInput.category_id);
    formData.append('slug',productInput.slug);
    formData.append('name',productInput.name);
    formData.append('description',productInput.description);

    formData.append('meta_title',productInput.meta_title);
    formData.append('meta_keyword',productInput.meta_keyword);
    formData.append('meta_description',productInput.meta_description);

    formData.append('selling_price',productInput.selling_price);
    formData.append('original_price',productInput.original_price);
    formData.append('qty',productInput.qty);
    formData.append('brand',productInput.brand);
    formData.append('featured',productInput.featured);
    formData.append('popular',productInput.popular);
    formData.append('status',productInput.status);

          axios.post(`/api/update-product/${product_id}`,formData).then(res=>{
              if(res.data.status===200){
                  swal("Success",res.data.message,"success");
                  setError([]);
                  history.push('/admin/show-product');
              }else if(res.data.status===422){
                  swal("All fields must be filled","","warning");
                  setError(res.data.errors);
              }else if(res.data.status===404){
                  swal("Error",res.data.message,"error");
                  history.push('/admin/show-product');
              }
          });
}

if(loading){
  return <h4>Loading product data...</h4>
}

  return (
    <div className="container-fluid px-4">
    <div className="card mt-4">
    <div className="card-header">
      <h1 className="mt-4">Edit Product</h1>
      <form encType="multipart/form-data" onSubmit={updateProduct} id="product_form">

      <ul className="nav nav-tabs" id="myTab" role="tablist">

  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="details-tab" data-bs-toggle="tab" data-bs-target="#details" type="button" role="tab" aria-controls="details" aria-selected="false">Details</button>
  </li>

      </ul>

<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
    
    {/* Home Tab Fields */}
       <div className="form-group mb-3">
          <label>Select Category</label>
          <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control" >
          <option>-- Select Category --</option>
            {
              categorylist.map((item)=>{
                return(
                  <option value={item.id} key={item.id}>{item.name}</option>
                )
              })
            }
  
          </select>
          <span className="text-danger">{error.category_id}</span>
        </div>
      <div className="form-group mb-3">
          <label>Slug</label>
          <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control" />
          <span className="text-danger">{error.slug}</span>
        </div>
        <div className="form-group mb-3">
          <label>Name</label>
          <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
          <span className="text-danger">{error.name}</span>
        </div>
        <div className="form-group mb-3">
          <label>Description</label>
          <textarea name="description" onChange={handleInput} value={productInput.description} className="form-control" />
        </div>
        <div className="form-group mb-3">
          <label>Status</label>
          <input type="checkbox" name="status" onChange={handleInput} value={productInput.status}/>
        </div>
    
    </div>


  <div className="tab-pane fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">  
    {/* SEO Tags Tab Fields */}
        <div className="form-group mb-3">
            <label>Meta Title</label>
            <input type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title} className="form-control" />
          </div>
          <div className="form-group mb-3">
            <label>Meta Description</label>
            <textarea name="meta_description" onChange={handleInput} value={productInput.meta_description} className="form-control" />
          </div>
          <div className="form-group mb-3">
            <label>Meta Keywords</label>
            <textarea name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword} className="form-control" />
          </div>
  </div>



  <div className="tab-pane card-body border fade" id="details" role="tabpanel" aria-labelledby="details-tab">
    <div className="row">
    {/* Details Tab Fields */}

      <div className="col-md-4 form-group mb-3">
          <label>Selling Price</label>
          <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control" />
          <span className="text-danger">{error.selling_price}</span>
        </div>
        <div className="col-md-4 form-group mb-3">
          <label>Original Price</label>
          <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className="form-control" />
          <span className="text-danger">{error.original_price}</span>
        </div>
        <div className="col-md-4 form-group mb-3">
          <label>Quantity</label>
          <input type="text" name="qty" onChange={handleInput} value={productInput.qty} className="form-control" />
          <span className="text-danger">{error.qty}</span>
        </div>
        <div className="col-md-4 form-group mb-3">
          <label>Brand</label>
          <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control"/>
          <span className="text-danger">{error.brand}</span>
        </div>
        <div className="col-md-8 form-group mb-3">
          <label>Image</label>
          <input type="file" name="image" onChange={handleImage} className="form-control"/>
            <img src={`http://localhost:8000/${productInput.image}`} width="50px"/>
        </div>
        <div className="col-md-4 form-group mb-3">
          <label>Featured</label>
          <input type="checkbox" name="featured" onChange={handleInput} value={productInput.featured} className="w-50 h-50" />
        </div>
        <div className="col-md-4 form-group mb-3">
          <label>Popular</label>
          <input type="checkbox" name="popular" onChange={handleInput} value={productInput.popular} className="w-50 h-50"/>
        </div>
        <div className="col-md-4 form-group mb-3">
          <label>Status</label>
          <input type="checkbox" name="status" onChange={handleInput} value={productInput.status} className="w-50 h-50"/>
        </div>
  </div>
  </div>

</div>
<Link to="/admin/show-product" className="btn btn-primary mb-3 px-4 float-start">Back</Link>
<button type="submit" className="btn btn-primary px-4 float-end">Update</button>
</form>

</div>
</div>
    </div>
  );
}

export default EditProduct;
