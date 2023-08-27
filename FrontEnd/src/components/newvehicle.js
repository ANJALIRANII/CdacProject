import React, { useState, useEffect } from "react";
import axios from "axios";
import '../common.css'
import backgroundImage from '../images/landing.jpg'
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../redux/axiosInstance";
import swal from "sweetalert";

function NewVehicle() {
    const [makes, setMakes] = useState([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [fuels, setFuels] = useState([]);
    const [selectedFuel, setSelectedFuel] = useState("");
    const userId= localStorage.getItem("userId");
    const { instance }=useAxiosInstance();
    const [vehicleId, setVehicleId] = useState("");

    const navigate=useNavigate();
    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
      };

    // const navigate=useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/home/make`).then((response) => {
            setMakes(response.data);
        });
    }, []);

    const handleMakeChange = (e) => {
        setSelectedMake(e.target.value);
        setSelectedModel("");
        setSelectedFuel("");
        axios.get(`http://localhost:8080/home/model?makeName=${e.target.value}`).then((response) => {
            setModels(response.data);
        });
    };

    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
        setSelectedFuel("");
        axios
            .get(`http://localhost:8080/home/fuel?modelName=${e.target.value}`)
            .then((response) => {
                setFuels(response.data);
            });
            
    };

    const handleFuelChange = (e) => {
        setSelectedFuel(e.target.value);
    };

    function handleProceed() {
        if (selectedMake === "") {
            alert(`Please select Brand of Your Car`);
        } else if (selectedModel === "") {
            alert(`Please select Model`);
        } else if (selectedFuel === "") {
            alert(`Please select Fuel Type`);
        }
        //   alert(selectedMake !=="" && selectedModel !== "" && selectedFuel !=="")
        if (selectedMake !== "" && selectedModel !== "" && selectedFuel !== "") {
            axios
                .get(`http://localhost:8080/home/vehicleId?make=${selectedMake}&model=${selectedModel}&fuel=${selectedFuel}`)
                .then((response) => {
                    localStorage.setItem("vehicleId", response.data);
                    setVehicleId(response.data);
                    addvehicle();                    
                });   
        }
    };
    const addvehicle=async()=>{
        const payload={
            "userId":userId,
            "vehicleId": vehicleId
        }
        instance.post('/user/addvehicle', payload).then((response)=>{
            console.log(response.data)
            swal("Success!", "vehicle Added Successfully", "success")
            window.location.reload();
        }).catch((console.error()))

    }

    return (
       <div style={containerStyle}>
         <div className="container1" >
            <h2><i><b>Attach Your Vehicle To Your Account</b></i></h2>
            <br />
            <div className="dropdown">
                {/* <label htmlFor="make">Make:</label> */}
                <select id="make" onChange={handleMakeChange} value={selectedMake}>
                    <option value="">Select Make</option>
                    {makes.map((make) => (
                        <option value={make} key={make} >
                            {make}
                        </option>
                    ))}
                </select>
            </div>
            <br />
            <br />
            {/* {selectedMake && ( */}
            <div className="dropdown">
                {/* <label htmlFor="model">Model:</label> */}
                <select id="model" onChange={handleModelChange} value={selectedModel}>
                    <option value="">Select Model</option>
                    {models.map((model) => (
                        <option value={model} key={model}>
                            {model}
                        </option>
                    ))}
                </select>
            </div>
            <br />
            <br />
            <div className="dropdown">
                <select id="fuel" onChange={handleFuelChange} value={selectedFuel}>
                    <option value="">Select Fuel</option>
                    {fuels.map((fuel) => (
                        <option value={fuel} key={fuel}>
                            {fuel}
                        </option>
                    ))}
                </select>
            </div>
            <br />
            <br />
            <br />
            <div style={{textAlign:"center"}}>
            <button class="my-button" onClick={handleProceed}>  Add   </button>
            </div>


        </div>
       </div>
    );
}

export default NewVehicle;
