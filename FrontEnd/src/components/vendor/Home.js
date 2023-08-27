import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import './H.css';
import { Link ,useNavigate} from "react-router-dom";
import useAxiosInstance from "../../redux/axiosInstance";


export default function Home() {
  const [posts, setPosts] = React.useState([]);
  const { instance }=useAxiosInstance();

  //const pincode=localStorage.getItem("pincode");
  const pincode=413517

  const navigate=useNavigate();
  React.useEffect(() => {
    instance.get(`/vendor/status/${pincode}`).then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });
  }, []);

 

  return (
    <>
      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Model</th>
            <th>Make</th>
            <th>Fuel</th>
            <th>Flat No.</th>
            <th>City</th>
            <th>Locality</th>
            <th>Mobile No.</th>
            <th>Email</th>
            <th>Order Date</th>
            <th>Delivery Date</th>
            <th>Customer Id</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.email}>
              <td>{post.first_name}</td>
              <td>{post.last_name}</td>
              <td>{post.model}</td>
              <td>{post.make}</td>
              <td>{post.fuel}</td>
              <td>{post.flat_no}</td>
              <td>{post.city}</td>
              <td>{post.locality}</td>
              <td>{post.mobile_no}</td>
              <td>{post.email}</td>
              <td>{post.order_date}</td>
              <td>{post.delivery_date}</td>
              <td>{post.id}</td>
              
              <td><Link to={`/vendor/OrderStatus/${post.id}`} id={post.id}>{post.order_status}</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}






 // const goToOrderStatus=(custId)=>{
  //   axios.get(`http://localhost:8080/vendor/customer/${custId}`, {
  //     headers: {
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoicmFqaWxAZ21haWwuY29tIiwiZXhwIjoxNjc4MDM5MDE3LCJpYXQiOjE2Nzc5NTI2MTd9.9oLDnvxo8niXigpkR8yKlKgLTbWsV3ZaIzCGyYjyLQE'
  //     }
  //   }) 
  //     .then(response => {
  //       setCustomerDetails(response.data[0]);
  //       setOrderStatus(response.data[0].order_status);
  //       setItemDetails(response.data[0].item_name + ' - ' + response.data[0].detail);
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };
  


  