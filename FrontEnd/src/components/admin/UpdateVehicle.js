import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Form,FormGroup, Input } from "reactstrap";
import useAxiosInstance from "../../redux/axiosInstance";


function UpdateVehicle(){

    const [make, setMake] = useState("");
    const [fuel, setFuel] = useState("");
    const [model, setModel] = useState("");
    const { instance }=useAxiosInstance();

    const { vehicleId }=useParams();
    console.log("VehicleId: "+vehicleId);


    useEffect(()=>{
        document.title="Update Vehicle"
    }, [])

    const handleMakeChange = (event) => {
        setMake(event.target.value);
      };

    const handleModelChange = (event) => {
        setModel(event.target.value);
      };
    
    const handleFuelChange = (event) => {
        setFuel(event.target.value);
      };

    const updateVehicle=(event)=>{
        event.preventDefault();

        const vehicle = {
            id:vehicleId,
            make: make,
            model: model,
            fuel: fuel
          };
        instance.put("/admin/updateVehicle",vehicle,{
        //    data: {"id": id},
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(response=>{
            console.log(response.data);
            alert(response.data);
        })
        .catch(error=>{
            console.log(error);
        });
    };


    return (
        <div>
            <h1 className="text-center my-3">Update Vehicle Detail</h1>
            <Form>
                

                <FormGroup>
                    <label for="make"> Company Name</label>
                    <Input type="text" 
                        name="make" 
                        id="make"
                        value={make}
                        onChange={handleMakeChange}
                    />
                </FormGroup>

                <FormGroup>
                <label for="model">Model</label>
                <Input 
                        id="model"
                        name="model"
                        type="text"
                        value={model}
                        onChange={handleModelChange}                        
                />
                </FormGroup>

                <FormGroup>
                <label for="fuel">Fuel</label>
                <Input 
                        id="fuel"
                        name="fuel"
                        type="text"
                        value={fuel}
                        onChange={handleFuelChange}                        
                />
                </FormGroup>

                <Container className="text-center">
                   
                    <Button color="success" onClick={updateVehicle}>Update Vehicle</Button>
                                        
                    <Button color="warning">Clear</Button>

                </Container>


            </Form>
        </div>
    )

};

export default UpdateVehicle;