import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

const Menus=()=>{
    return(
       <div >
         <ListGroup>
            <Link className="list-group-item list-group-item-action" 
                tag="a"     
                to="/admin" 
                action>
                Home
            </Link>

            <Link className="list-group-item list-group-item-action" 
                tag="a"     
                to="/admin/categories" 
                action>
                Show Category
            </Link>
            
            <Link className="list-group-item list-group-item-action" 
                tag="a"     
                to="/admin/addcategory" 
                action>
                Add Category
            </Link>

            <Link className="list-group-item list-group-item-action" 
                tag="a"     
                to="/admin/showvendor" 
                action>
                Show Vendors
            </Link>

            <Link className="list-group-item list-group-item-action" 
                tag="a"     
                to="/Register" 
                action>
                Add Vendor
            </Link>

            <Link className="list-group-item list-group-item-action" 
                tag="a"     
                to="/admin/showitem" 
                action>
                Show Items
            </Link>

            <Link className="list-group-item list-group-item-action" 
                tag="a"     
                to="/admin/additem" 
                action>
                Add Items
            </Link>

            <Link className="list-group-item list-group-item-action" 
                tag="a"     
                to="/admin/showVehicle" 
                action>
                Show Vehicle detail
            </Link> 

            <Link className="list-group-item list-group-item-action" 
                tag="a"     
                to="/admin/addnewvehicle" 
                action>
                Add Vehicle
            </Link>

        </ListGroup>
       </div>
    )
}

export default Menus;