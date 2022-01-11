import axios from "axios";
import React, { useEffect,useState } from "react";
import {Link} from 'react-router-dom';
// import swal from "sweetalert";


function ShowProduct() {

const[loading,setLoading]=useState(true);
const[productlist,setProductlist]=useState([]);

useEffect(()=>{

    document.title='Izzy Tech | Products';
        axios.get(`/api/show-product`).then(res=>{
            if(res.data.status===200){
                setProductlist(res.data.product);
            }
            setLoading(false);
        });
},[]);

// const deleteProduct=(e,id)=>{
//     e.preventDefault();
//     const clicked=e.currentTarget;
//     clicked.innerText="Deleting";
//     axios.delete(`/api/delete-product/${id}`).then(res=>{
//         if(res.data.status===200){
//             swal("Success",res.data.message,"success");
//             clicked.closest('tr').remove();
//         }else if(res.data.status===404){
//             swal("Success",res.data.message,"success");
//             clicked.innerText="Delete";
//         }
//     });
// }

var productStatus='';
var showproduct_HTMLTABLE="";
if(loading){
    return <h4>Loading products...</h4>
}else{
    showproduct_HTMLTABLE=productlist.map((item)=>{
        if(item.status=='0'){
            productStatus='Shown';
        }else if(item.status=='1'){
            productStatus='Hidden';
        }
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.category.name}</td>
                <td>{item.name}</td>
                <td>{item.selling_price}</td>
                <td><img src={`http://localhost:8000/${item.image}`} width="50px"alt={item.name}/></td>
                <td>
                    <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm=">Edit</Link>
                </td>
                <td>
                    {/* <button type="button" onClick={(e)=>deleteProduct(e,item.id)} className="btn btn-danger btn-sm=">Delete</button> */}
                    {productStatus}
                </td>
            </tr>
        )
    });
}

  return(
      
      <div className="container px-4">
       
          <div className="card px-4 mt-3">
          <div className="card-header">
                <h4>Product List
                    <Link to="/admin/add-product" className="btn btn-primary btn-sm float-end">Add Product</Link>
                </h4>
          </div>
          <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {showproduct_HTMLTABLE}
                    </tbody>
                </table>
                </div>
          </div>
      </div>
    </div>
  )
}

export default ShowProduct;
