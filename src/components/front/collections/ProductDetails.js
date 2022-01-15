import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function ProductDetails(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const[quantity,setQuantity]=useState(1);


  useEffect(() => {
    const category_slug = props.match.params.category;
    const product_slug = props.match.params.product;
    axios
      .get(`/api/view-product/${category_slug}/${product_slug}`)
      .then((res) => {
        if (res.data.status === 200) {
          setProduct(res.data.product);
          setLoading(false);
        } else if (res.data.status === 404) {
          history.push("/collections");
          swal("Warning", res.data.message, "error");
        }
      });
  }, [props.match.params.category, props.match.params.product, history]);

  const handleIncrement=()=>{
      if(quantity<50){
        setQuantity(prevCount=>prevCount+1);
      }
}
  const handleDecrement=()=>{
      if(quantity>1){
        setQuantity(prevCount=>prevCount-1);
      }
  }

  const submitToCart=(e)=>{
      e.preventDefault();
      const data={
          product_id:product.id,
          product_quantity:product.qty,
      }
      axios.post(`/api/add-to-cart`,data).then(res=>{
        if(res.data.status===201){
            swal("Success",res.data.message,"success");
        }else if(res.data.status===401){
            swal("Error",res.data.message,"error");
        }
        else if(res.data.status===404){
            swal("Error",res.data.message,"error");
        }
        else if(res.data.status===409){
            swal("Warning",res.data.message,"warning");
        }
      });
  }
  if (loading) {
    return <h4>Loading product details...</h4>;
  } else {
    var in_stock = "";

    if(product.qty>0){
    in_stock =
      <div>
        <label className="btn-sm btn-success px-4 mt-2">In Stock</label>
        <div className="row">
          <div className="col-md-3 mt-3">
            <div className="input-group">
              <button type="button" onClick={handleDecrement} className="input-group-text">
                -
              </button>
              <div className="form-control text-center">{quantity}</div>
              <button type="button" onClick={handleIncrement} className="input-group-text">
                +
              </button>
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <button type="button" onClick={submitToCart} className="btn btn-primary w-100">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    }
    else{
        in_stock =
        <div>
          <label className="btn-sm btn-danger px-4 mt-2">Out of Stock</label>  
        </div>
    }
  }

  return (
    <div>
      <div className="py-3 bg-dark text-white">
        <div className="container">
          <h6>
            Collections / {product.category.name} / {product.name}
          </h6>
        </div>
      </div>

      <div className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 border-end ">
              <img
                src={`http://localhost:8000/${product.image}`}
                alt={product.name}
                className="w-100"
              />
            </div>

            <div className="col-md-8">
              <h4>
                {product.name}
                <span className="float-end badge btn-sm btn-danger badge-pil">
                  {product.brand}
                </span>
              </h4>
              <p>{product.description}</p>
              <h4 className="mb-1">
                Old:
                <s className="ms-2 text-danger">{product.original_price}din</s>
                &ensp;New: {product.selling_price}din
              </h4>
              <div>
                  {in_stock}
              </div>
              <button type="button" className="btn btn-danger mt-3">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
