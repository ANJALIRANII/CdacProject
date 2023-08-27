import React, {useRef, useState } from "react";
import {  useNavigate } from "react-router-dom";
import './login.css';
import image from "../../images/landing.jpg";
import { useDispatch } from "react-redux";
import useAxiosInstance from "../../redux/axiosInstance";
import swal from "sweetalert";

export default function Forget(props) {
  const navigate=useNavigate();
  const { instance }=useAxiosInstance();
  const form = useRef();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const onChangeUsername = (e) => {
    let username = e.target.value;
    setUsername(username);
  };

  
  const handleSendOtp = async(e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    //form.current.validateAll();
        const payload={
            "email":username
        }

        await instance.post('/home/forgetPassword', payload).then((response)=>{
            console.log(response.data)
            if(response.data==true){
                swal("Success!", "OTP sent Successfully", "success")
                navigate('/verifyotp',{ state: { "email": username } })
            }
            else{
                //swal("failuer!","unable to send OTP... Check Your Email","failuer")
                setMessage("Failed, Invalid Email")
                window.location.reload();
                // navigate('/forget')
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
          setLoading(false);
          setMessage(resMessage);
        }
      );
  };

  return (
    <div>
      <img src={image}  className="card-img-top rounded-3" alt="..." />

      {/* <ToastContainer/> */}
      <form className="forget" onSubmit={handleSendOtp} ref={form}>
        <h3 style={{textAlign:"center"}}>
          <b>Forget Password</b>
        </h3>

        <div className="form-outline mb-2">
          <label className="form-label">
            Email ID :
          </label>
          <input
            type="email"
            id="form2"
            className="form-control"
            name="username"
            placeholder="Enter your Email"
            value={username}
            required
            onChange={onChangeUsername}
          />
        </div>

        <div className="text-center pt-1 mb-2 pb-1" >
          <button className="btn btn-success btn-block fa-lg mb-3" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Get OTP</span>
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
