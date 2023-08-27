import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "./Menu.css";


const VendorMenu = () => {
  const startDate= '';  // check after removing these
  const endDate= '';
  const pincode= '';

  return (
    <ListGroup className="menu">
      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to={`/vendor/status/${pincode}`}
        action
      >
        Home
      </Link>
    
      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to={`/vendor/totalincome?startDate=${startDate}&endDate=${endDate}`}
        action
      >
        Payments
      </Link>
   
      {/* <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/vendor/order/changestatus?id=1"
        action
      >
        Order Status
      </Link> */}
      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to={`/vendor/users/${pincode}`}
        action
      >
        DashBoard
      </Link>
    </ListGroup>
  );
};

export default VendorMenu;
