import { useEffect, useState } from "react";
import useAxiosInstance from "../redux/axiosInstance";
import './orderaddress.css'
import backgroundImage from '../images/landing.jpg'
import { useNavigate, useLocation} from "react-router-dom";
import logo from "../images/peakauto.jpg"
import useRazorpay from 'react-razorpay';
import swal from "sweetalert";


function OrderAddress(){
    const { instance }= useAxiosInstance();
    const location=useLocation();
    const navigate=useNavigate();
    const [addressList, setAddressList]=useState([]);
    const [vehicleList, setVehicleList]=useState([]);
    const [selectedAddress, setSelectedAddress]=useState("");
    const [selectedVehicle, setSelectedVehicle]=useState("");
    const userId=parseInt(localStorage.getItem("userId"));
    const isLoggedIn=localStorage.getItem("isLoggedIn");
    const [message, setMessage] = useState("");
    const [messageforvehicle, setMessageforvehicle] = useState("");
    const Razorpay=useRazorpay();
    const totalPrice=location.state.totalPrice;
    const userName=localStorage.getItem("firstName");

    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
      };

    const handleAddressChange = (e) => {
        setSelectedAddress(e.target.value);
    };
    const handleVehicleChange=(e)=>{    
        setSelectedVehicle(e.target.value);
    }

    const proceed=async()=>{

        if((selectedAddress!="" && selectedAddress!=-1) && (selectedVehicle!="" && selectedVehicle!=-1)){
            const payload={
            "amount":totalPrice
            }

            await instance.post('/user/razorpay', payload).then((response) => {
                console.log(response.data);
                if(response.data.status=="created"){
                    var options = {
                        "key": "rzp_test_o41BI4yu6rkJdU", // Enter the Key ID generated from the Dashboard
                        "amount": response.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                        "currency": "INR",
                        "name": "PeakAutomotives",
                        "description": "Servicing",
                        "image": logo,
                        "order_id": response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                        // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
                        "prefill": {
                            "name": userName,
                            "email": "",
                            "contact": ""
                        },
                        "notes": {
                            "address": ""
                        },
                        "theme": {
                            "color": "#3399cc"
                        },
                        "handler": function (response){
                            // alert(response.razorpay_payment_id);
                            // alert(response.razorpay_order_id);
                            // alert(response.razorpay_signature)}
                            // alert("Congrates..!! payment Successful");

                            instance.get(`/user/order?userId=${userId}&addressId=${selectedAddress}&vehicleId=${selectedVehicle}`).then((response) => {
                                console.log(response.data);
                                swal("Success!", "Your Order has been processed.", "success")
                                navigate("/");
                            })

                        }
                    }
                let rzp=new Razorpay(options);

                rzp.on('payment.failed', function (response){
                    console.log(response.error.code);
                    console.log(response.error.description);
                    console.log(response.error.source);
                    console.log(response.error.step);
                    console.log(response.error.reason);
                    console.log(response.error.metadata.order_id);
                    console.log(response.error.metadata.payment_id);
                    alert("Payment Failed")
                })

                rzp.open();
                

            }
            else{
                alert("Something Went Wrong razor-order not created")
            }
        }
        
        )
            .catch((error) => {
                console.error(error);
                alert("Something Went Wrong");
                return;
            });
        }else{
            swal("plz select corresponding Address & vehicle");
           
        }
        
    }

    const fetchAddress = async ()=>{
        const payload={
            "id":userId
        }

        await instance.post('/user/address',payload).then((response)=>{
            if(response.data.length==0){
                setMessage("No Address Found")
                return
            }
            else
                setMessage("");

            setAddressList(response.data);
            console.log({addressList});
        })
    }
    const fetchVehicles = async ()=>{

        const payload={
            "id":userId
        }

            await instance.get(`/user/vehicles/${userId}`).then((response)=>{
                if(response.data.length==0){
                    setMessageforvehicle("no vehicle record");
                    return
                }else{
                    setMessageforvehicle("")
                    setVehicleList(response.data)
                }
            })
    }

    useEffect(() => {
        if(isLoggedIn=="true")
        fetchAddress();
        fetchVehicles(); 
    }, [])


    return(
        <div>
            <div style={containerStyle}>
                <div className="ordercontainer" >
                    <div className="orderaddress">
                        {/* <label htmlFor="make">Make:</label> */}
                        <h4>Select Address :</h4>
                        <select id="address" onChange={handleAddressChange} value={selectedAddress}>
                            <option value="">Select Address</option>
                            {addressList.map((address) => (
                                <option value={address.id} key={address.id} >
                                    {address.flatNo} , {address.locality} , {address.city} , {address.pincode}
                                </option>
                                
                            ))}
                            <option value={-1}>{message}</option>
                        </select>

                        <h4>Select Vehicle :</h4>
                        <select id="vehicle" onChange={handleVehicleChange} value={selectedVehicle}>
                            <option value="">Select Vehicle</option>
                            {vehicleList.map((vehicle) => (
                                <option value={vehicle.id} key={vehicle.id} >
                                    {vehicle.make} - {vehicle.model} - {vehicle.fuel}
                                </option>
                                
                            ))}
                            <option value={-1}>{messageforvehicle}</option>
                        </select>
                    </div>
                    
                    <br/>
                    <div style={{ textAlign: 'center' }}>
                        <button className="address-btn" onClick={()=>navigate('/newaddress')}>Add new Address</button>
                        <button className="address-btn" onClick={()=>navigate('/newvehicle')}>Add Vehicle</button>
                    </div>
                    <hr></hr>
                    <div style={{ textAlign: 'center' }}>
                    <button className="proceed " onClick={()=>proceed()}>Proceed</button>
                    </div>
                        
                    
                   
                
                </div>
                
            </div>
           
        </div>
            

    );
}
export default OrderAddress;