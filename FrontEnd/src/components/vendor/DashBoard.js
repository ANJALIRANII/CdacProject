import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import useAxiosInstance from "../../redux/axiosInstance";
import "./H.css";


export default function DashBoard() {
  const [post, setPost] = useState([]);
  const [filter, setFilter] = useState("all"); // add a state for the selected option
  const { instance }= useAxiosInstance();

  // const pincode=localStorage.getItem("pincode")
  const pincode=413517;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await instance.get(`/vendor/users/${pincode}`);
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  // filter the post array based on the selected option
  const filteredPost = filter === "all" ? post : post.filter(p => p.order_status === filter);

  return (
    <div>
      <label>
        Filter by order status:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="COMPLETED">Completed</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="PROCESSING">Processing</option>
        </select>
      </label>
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
          {filteredPost.map((p) => (
            <tr key={p.mobile_no}>
              <td>{p.first_name}</td>
              <td>{p.last_name}</td>
              <td>{p.model}</td>
              <td>{p.make}</td>
              <td>{p.fuel}</td>
              <td>{p.flat_no}</td>
              <td>{p.city}</td>
              <td>{p.locality}</td>
              <td>{p.mobile_no}</td>
              <td>{p.email}</td>
              <td>{p.order_date}</td>
              <td>{p.delivery_date}</td>
              <td>{p.id}</td>
              <td>{p.order_status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
