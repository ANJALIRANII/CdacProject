import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import useAxiosInstance from '../../redux/axiosInstance';


function VehicleDetails() {
  const [VehicleData, setVehicleData] = useState([]);
  const { instance }=useAxiosInstance();

  useEffect(() => {
    async function fetchVehicleData() {
      const response = await instance.get(`/home/allVehicle`);
      const data = response.data;
      setVehicleData(data);     
    }
    fetchVehicleData();
  }, []);


  const handleDelete = (id) => {
    const vehicle = VehicleData.find(vehicle => vehicle.id === id);
    instance.delete(`/admin/deleteVehicle`, { data: { id: vehicle.id } })
      .then(response => {
        console.log(response);
        const newData = VehicleData.filter(vehicle => vehicle.id !== id);
        setVehicleData(newData);
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  
  useEffect(()=>{
    document.title="Show Vehicle Details"
}, [])

  return (
    <div>
    <h1 className="text-center my-3">Vehicle Details</h1>
    <hr></hr>
    <Table striped bordered hover className="custom-table">
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Model</th>
          <th>Fuel Type</th>
          <th>Action</th>
         
        </tr>
      </thead>
      <tbody>
        {VehicleData.map((vehicle) => (
          <tr key={vehicle.id}>
            <td>{vehicle.make}</td>
            <td>{vehicle.model}</td>
            <td>{vehicle.fuel}</td>
            <td>
              {/* <Button color="warning" onClick={() => handleUpdate(vehicle.id)}>Update</Button> */}
              <Button color="danger" 
              // onClick={() => handleDelete(vehicle.id)}
              onClick={() => handleDelete(vehicle.id)}

              >Delete</Button>
              <Link to={`/admin/updateVehicle/${vehicle.id}`}><Button color="warning">Update</Button></Link>
            </td>

          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
}

export default VehicleDetails;