import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";

function Cart() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  var cartTotal=0;

  if (!localStorage.getItem("auth_token")) {
    history.push("/");
    swal("Warning", "Please log in to access the cart", "error");
  }

  useEffect(() => {
    let isMounted = true;

    axios.get(`/api/cart`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCart(res.data.cart);
          setLoading(false);
        } else if (res.data.status === 401) {
          history.push("/");
          swal("Warning", res.data.message, "error");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [history]);

  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty + (item.product_qty < 50 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "dec");
  };
  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "inc");
  };

  function updateCartQuantity(cart_id, scope) {
    axios.put(`/api/cart-update/${cart_id}/${scope}`).then((res) => {
      // if(res.data.status===200){
      //   //swal("Success",res.data.message,"success");
      // }
    });
  }

  const deleteCartItem = (e, cart_id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing";
    axios.delete(`/api/delete-cartitem/${cart_id}`).then((res) => {
      if (res.data.status === 200) {
        thisClicked.closest("tr").remove();
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        this.onClicked.innerText("Remove");
      }
    });
  };

  if (loading) {
    return <h4>Loading Product Details...</h4>;
  } else {
    var cart_HTML = "";
    if (cart.length > 0) {
      cart_HTML = (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => {
                let price = parseFloat(item.product.selling_price);
                cartTotal+=price * item.product_qty;
                return (
                  <tr key={idx}>
                    <td width="10%">
                      <img
                        src={`http://localhost:8000/${item.product.image}`}
                        alt={item.product.name}
                        width="50px"
                        height="50px"
                      />
                    </td>
                    <td>{item.product.name}</td>
                    <td width="15%" className="text-center">
                      {item.product.selling_price}din
                    </td>
                    <td width="15%">
                      <div className="input-group">
                        <button
                          type="button"
                          onClick={() => handleDecrement(item.id)}
                          className="input-group-text"
                        >
                          -
                        </button>
                        <div className="form-control text-center">
                          {item.product_qty}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleIncrement(item.id)}
                          className="input-group-text"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td width="15%" className="text-center">
                      {(price * item.product_qty).toFixed(3)}din
                    </td>
                    <td width="10%">
                      <button
                        type="button"
                        onClick={(e) => deleteCartItem(e, item.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      cart_HTML = (
        <div>
          <div className="card card-body py-5 text-center shadow-sm">
            <h4>Your cart is empty</h4>
          </div>
        </div>
      );
    }
  }
  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home / Cart</h6>
        </div>
      </div>

      <div className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{cart_HTML}</div>
            <div className="col-md-8"></div>
              <div className="col-md-4">
                <div className="card card-body mt-3">
                  <h4>
                    Subtotal:
                    <span className="float-end">{cartTotal}</span>
                  </h4>
                  <h4>
                    Grand Total:
                    <span className="float-end">{cartTotal}</span>
                  </h4>
                  <hr />
                  <Link to="/checkout" className="btn btn-primary">
                    Checkout
                  </Link>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
