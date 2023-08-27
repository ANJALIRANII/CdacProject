import React, { useEffect, useState } from "react";
import { Button, Container, Form,FormGroup, Input } from "reactstrap";
import useAxiosInstance from "../../redux/axiosInstance";

function AddVehicle(){
    const [vehicle, setVehicle] = useState({});
    const { instance }=useAxiosInstance();

    useEffect(()=>{
        document.title="Add Vehicle"
    }, [])



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVehicle({ ...vehicle, [name]: value });
      };
    
      const handleAddVehicle = (event) => {
        event.preventDefault();
        instance.post(`/admin/addnewvehicle`, vehicle)
          .then(response => {
            console.log(response.data);
            alert("Vehicle added successfully!");
          })
          .catch(error => {
            console.log(error);
            alert("Failed to add vehicle!");
          });
      };

    return (
        <div>
            <h1 className="text-center my-3">Fill Vehicle Detail</h1>
            <Form onSubmit={handleAddVehicle}>

                <FormGroup>
                    <label for="make">Vehicle Company</label>
                    <Input type="text"  
                        name="make" 
                        id="make"
                        placeholder="Enter Company name"
                        value={vehicle.make || ''}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label for="model">Model Name</label>
                    <Input type="text" 
                        name="model" 
                        id="model"
                        placeholder="Enter Model name"
                        value={vehicle.model || ''}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup>
                <label for="fuel">Fuel Type</label>
                <Input 
                        id="fuel"
                        name="fuel"
                        type="text"
                        placeholder="Enter Fuel name"
                        value={vehicle.fuel || ''}
                        onChange={handleInputChange}
                />
                </FormGroup>

                
                <Container className="text-center">
                    <Button color="success" type="submit">Add Vehicle</Button>
                    <Button color="warning ml-2" onClick={() => setVehicle({})}>Clear</Button>

                </Container>


            </Form>
        </div>
    )

};

export default AddVehicle;