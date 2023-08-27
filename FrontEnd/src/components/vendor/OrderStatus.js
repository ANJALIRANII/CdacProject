import React, { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import './OrderStatus.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAxiosInstance from '../../redux/axiosInstance';


function OrderStatus(props) {
  const [customerDetails, setCustomerDetails] = useState({});
  const [orderStatus, setOrderStatus] = useState('');
  const [itemDetails, setItemDetails] = useState('');
  const { instance }=useAxiosInstance();
  const { id } = useParams();

  useEffect(() => {
    
    instance.get(`/vendor/customer/${id}`) 
      .then(response => {
        setCustomerDetails(response.data[0]);
        setOrderStatus(response.data[0].order_status);
        setItemDetails(response.data[0].item_name + ' - ' + response.data[0].detail);
        console.log(response.data);
        console.log(id);
      })
      .catch(error => {
        console.log(error);
      });
  },[]);


  const handleUpdateOrderStatus = () => {
    instance.put(`/vendor/order/changestatus?id=${id}`) // Replace 1 with the order ID you want to update
      .then(response => {
        setOrderStatus('PROCESSING'); // Replace with the new order status you want to set
        console.log(response.data);
        console.log(id);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="container">
           <div className="card mx-auto">
             <div className="card-header">
               <h1 className="text-center">Customer Details</h1>
             </div>
             <div className="card-body">
               <p><strong>First Name:</strong> {customerDetails.first_name}</p>
               <p><strong>Last Name:</strong> {customerDetails.last_name}</p>
               <p><strong>Order Status:</strong> {orderStatus}</p>
               <p><strong>Item Details:</strong> {itemDetails}</p>
               <button className="primary" onClick={handleUpdateOrderStatus}>Update Order Status</button>
             </div>
           </div>
       </div>


  );
}

export default OrderStatus;