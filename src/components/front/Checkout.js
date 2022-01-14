import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import  ReactDOM from "react-dom";

function Checkout() {
  const history = useHistory();
  //const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState([]);
  const [checkoutInput, setCheckoutInput] = useState({
    forname: "",
    surname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });
  var cartTotal = 0;

  if (!localStorage.getItem("auth_token")) {
    history.push("/");
    swal("Warning", "Please log in to access checkout", "error");
  }

  useEffect(() => {

    axios.get(`/api/checkout`).then((res) => {
        if (res.data.status === 200) {
          setCart(res.data.cart);
          //setLoading(false);
        } else if (res.data.status === 404) {
          history.push("/");
          swal("Warning", res.data.message, "error");
        }
      
    });
  }, [history]);

  const handleInput = (e) => {
    e.persist();
    setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };

  var orderinfo_data = {
    forname: checkoutInput.forname,
    surname: checkoutInput.surname,
    phone: checkoutInput.phone,
    email: checkoutInput.email,
    address: checkoutInput.address,
    city: checkoutInput.city,
    zip: checkoutInput.zip,
    country: checkoutInput.country,
    payment_mode: "PayPal Payment",
    payment_id: "",
  };
  const PayPalButton = window.paypal.Buttons.driver("react", {
    React,
    ReactDOM,
  });
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cartTotal,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    //return actions.order.capture();
    return actions.order.capture().then(function (details) {
      orderinfo_data.payment_id = details.id;
      axios.post(`/api/place-order`, orderinfo_data).then((res) => {
        swal("Order Placed Successfully", res.data.message, "success");
        if (res.data.status === 200) {
          swal("Order Placed Successfully", res.data.message, "success");
          setError([]);
          history.push("/thanks");
        } else if (res.data.status === 422) {
          swal("All Fields Are Required", "", "warning");
          setError(res.data.errors);
        }
      });
    });
  };

  const submitOrder = (e, payment_mode) => {
    e.preventDefault();
    var data = {
      forname: checkoutInput.forname,
      surname: checkoutInput.surname,
      phone: checkoutInput.phone,
      email: checkoutInput.email,
      address: checkoutInput.address,
      city: checkoutInput.city,
      zip: checkoutInput.zip,
      country: checkoutInput.country,
      payment_mode: payment_mode,
      payment_id: "",
    };

    switch (payment_mode) {
      case "cod":
        axios.post(`/api/place-order`, data).then((res) => {
          swal("Order Placed Successfully", res.data.message, "success");
          if (res.data.status === 200) {
            swal("Order Placed Successfully", res.data.message, "success");
            setError([]);
            history.push("/thanks");
          } else if (res.data.status === 422) {
            swal("All Fields Are Required", "", "warning");
            setError(res.data.errors);
          }
        });
        break;
      case "razorpay":
        axios.post(`/api/validate-order`, data).then((res) => {
          if (res.data.status === 200) {
            setError([]);
            cartTotal *= 100;
            var options = {
              key: "rzp_test_kFoznctQjqqBHJ",
              amount: { cartTotal },
              name: "Izzy Tech ltd",
              description: "Please Choose Your Payment Method",
              image: "https://www.accessibility.com/hubfs/Izzy%20Wheels.png",
              handler: function (response) {
                console.log(response.razorpay_payment_id);
                data.payment_id = response.razorpay_payment_id;
                alert(response.razorpay_payment_id);
                axios.post(`/api/place-order`, data).then((res) => {
                  swal(
                    "Order Placed Successfully",
                    res.data.message,
                    "success"
                  );
                  if (res.data.status === 200) {
                    swal(
                      "Order Placed Successfully",
                      res.data.message,
                      "success"
                    );
                    setError([]);
                    history.push("/thanks");
                  }
                });
              },
              prefill: {
                name: data.forname + data.surname,
                email: data.email,
                contact: data.phone,
              },

              theme: {
                color: "#3399cc",
              },
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
          } else if (res.data.status === 422) {
            swal("All Fields Are Required", "", "warning");
            setError(res.data.errors);
          }
        });
        break;
      case "payonline":
        axios.post(`/api/validate-order`, data).then((res) => {
          if (res.data.status === 200) {
            setError([]);
            var myModal = new window.bootstrap.Modal(
              document.getElementById("myModal")
            );
            myModal.show();
          } else if (res.data.status === 422) {
            swal("All Fields Are Required", "", "warning");
            setError(res.data.errors);
          }
        });
        break;
      default:
        break;
    }
  };
  // if (loading) {
  //   return <h4>Loading Order Details...</h4>;
  // }else{
  var checkout_HTML = "";
  if (cart.length > 0) {
    checkout_HTML = (
      <div>
        <div className="row">
          <div className="col-md-7">
            <div className="card">
              <div className="card-header">
                <h4>Shipping Details</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="forname"
                        onChange={handleInput}
                        value={checkoutInput.forname}
                        className="form-control"
                      />
                      <small className="text-danger">{error.forname}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="surname"
                        onChange={handleInput}
                        value={checkoutInput.surname}
                        className="form-control"
                      />
                      <small className="text-danger">{error.surname}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        onChange={handleInput}
                        value={checkoutInput.phone}
                        className="form-control"
                      />
                      <small className="text-danger">{error.phone}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        onChange={handleInput}
                        value={checkoutInput.email}
                        className="form-control"
                      />
                      <small className="text-danger">{error.email}</small>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-3">
                      <label>Address</label>
                      <textarea
                        rows="3"
                        className="form-control"
                        name="address"
                        onChange={handleInput}
                        value={checkoutInput.address}
                      ></textarea>
                      <small className="text-danger">{error.addredd}</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        onChange={handleInput}
                        value={checkoutInput.city}
                        className="form-control"
                      />
                      <small className="text-danger">{error.city}</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>ZIP Code</label>
                      <input
                        type="text"
                        name="zip"
                        onChange={handleInput}
                        value={checkoutInput.zip}
                        className="form-control"
                      />
                      <small className="text-danger">{error.zip}</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>Country</label>
                      <input
                        type="text"
                        name="country"
                        onChange={handleInput}
                        value={checkoutInput.country}
                        className="form-control"
                      />
                      <small className="text-danger">{error.country}</small>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group text-end">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => submitOrder(e, "cod")}
                      >
                        Place Order
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => submitOrder(e, "razorpay")}
                      >
                        RazorPay
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={(e) => submitOrder(e, "payonline")}
                      >
                        PayPal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th width="50%">Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => {
                  let price = parseFloat(item.product.selling_price);
                  cartTotal += price * item.product_qty;
                  return (
                    <tr key={idx}>
                      <td>{item.product.name}</td>
                      <td>{item.product.selling_price}din</td>
                      <td>{item.product_qty}</td>
                      <td>{(price * item.product_qty).toFixed(3)}din</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="2" className="text-end fw-bold">
                    Grand Total
                  </td>
                  <td colSpan="2" className="text-end fw-bold">
                    {cartTotal}din
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    checkout_HTML = (
      <div>
        <div className="card card-body py-5 text-center shadow-sm">
          <h4>Your cart is empty</h4>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div
        class="modal fade"
        id="payonlinemodal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                PayPal
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              return (
              <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
              />
              );
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home / Checkout</h6>
        </div>
      </div>

      <div className="py-4">
        <div className="container">
              {checkout_HTML}
        </div>
      </div>
    </div>
  );
}
export default Checkout;
