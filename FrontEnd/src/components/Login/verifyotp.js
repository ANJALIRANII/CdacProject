import React, {useRef, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import './login.css';
import image from "../../images/landing.jpg";
import { useDispatch } from "react-redux";
import useAxiosInstance from "../../redux/axiosInstance";
import swal from "sweetalert";


export default function VeryOtp(props) {
  const navigate=useNavigate();
  const { instance }=useAxiosInstance();
  const form = useRef();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const location=useLocation();
  const email=location.state.email;
  console.log(email);


  const onChangeOtp = (e) => {
    let otp = e.target.value;
    setOtp(otp);
  };

  
  const handleVerify = async(e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    //form.current.validateAll();
        const payload={
            "email":email,
            "otp":otp
        }

        await instance.post('/home/verifyOtp', payload).then((response)=>{
            console.log(response.data)
            if(response.data==true){
                swal("Success!", "OTP verified", "success")
                navigate('/changePass',{ state: { "email": email } })
            }
            else{
                swal("Incorrect OTP")
            }
        },
        (error) => {
          //toast.error("Error")
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            swal("Oops!", "Invalid OTP !", "error");
          setLoading(false);
          // setMessage(resMessage);
        }
      );
  };

  return (
    <div>
      <img src={image}  className="card-img-top rounded-3" alt="..." />

      {/* <ToastContainer/> */}
      <form className="forget" onSubmit={handleVerify} ref={form}>
        <h3 style={{textAlign:"center"}}>
          <b>Forget Password</b>
        </h3>

        <div className="form-outline mb-2">
          <label className="form-label">
            Enter OTP :
          </label>
          <input
            type="number"
            id="form2"
            className="form-control"
            name="otp"
            placeholder="Enter OTP you recieved"
            value={otp}
            required
            onChange={onChangeOtp}
          />
        </div>

        <div className="text-center pt-1 mb-2 pb-1" >
          <button className="btn btn-success btn-block fa-lg mb-3" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Verify OTP</span>
          </button>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
