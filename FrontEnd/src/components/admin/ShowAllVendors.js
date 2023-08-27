import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import useAxiosInstance from '../../redux/axiosInstance';

function ShowAllVendors() {
    const [vendors, setVendors] = useState([]);
    const { instance }=useAxiosInstance();
  
    useEffect(() => {
      instance.get(`/admin/getVendorList`)
          .then(response => {
            setVendors(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      const deleteVendor= async (vendorId)=>{
        try {
          console.log("VendorId: "+vendorId);
             const response = await instance.delete('/admin/deleteVendor', {
               data: {"id": vendorId },
               headers: {
                 'Content-Type': 'application/json'
               }
             });
         
             if (response.status == 200) {
               // Category deleted successfully
               console.log(`Vendor with ID ${vendorId} has been deleted`);
             } 
             else {
               // Category deletion failed
               console.error(`Failed to delete vendor with ID ${vendorId}`);
             }
             window.location.reload();
           } 
           catch (error) {
             console.error(`An error occurred while deleting vendor with ID ${vendorId}: ${error}`);
           }
       };
  
    return (
      <div>
        <h1 className="text-center my-3">List of Vendors</h1>
        <hr></hr>
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              
              <th>Mobile No.</th>
              <th>Email</th>
              
             
            </tr>
          </thead>
          <tbody>
            {/* Loop through the vendors array and display the vendor data */}
            {vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.firstName}</td>
                <td>{vendor.lastName}</td>
                
                <td>{vendor.mobileNo}</td>
                <td>{vendor.email}</td>
               
                
                <td>
                  <Button color="danger" onClick={()=>deleteVendor(vendor.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
  
  export default ShowAllVendors;
  