import React, {useRef, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import './login.css';
import image from "../../images/landing.jpg";
import { useDispatch } from "react-redux";
import useAxiosInstance from "../../redux/axiosInstance";
import swal from "sweetalert";


export default function NewPassword(props) {
  const navigate=useNavigate();
  const { instance }=useAxiosInstance();
  const form = useRef();
  const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const location=useLocation();
  const email=location.state.email;
  console.log(email);


  const onChangePassword = (e) => {
    let password = e.target.value;
   setPassword(password);
};
const onChangeConfirmPassword = (e) => {
    let confirmpassword = e.target.value;
    setConfirmpassword(confirmpassword);
  };

  const handleChangePassword = async(e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        if (password !== confirmpassword) {
        setLoading(false);
        setMessage("Passwords is not matching");
        return;
        }
        const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})/;
        if (!passwordRegex.test(password)) {
        setMessage("Password must contain at least one digit, one lowercase letter, one of the following special characters (#@$*), and be between 5 and 20 characters in length.");
        setLoading(false);
        return;
        }
        const payload={
            "email":email,
            "password":password
        }

        await instance.put('/home/changePassword', payload).then((response)=>{
            console.log(response.data)
            if(response.data==true){
                swal("Success!", "Password Changed", "success")
                navigate('/login')
            }
            else{
                swal("Failuer...!!!")
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
  
        <form className="newPassword" onSubmit={handleChangePassword} ref={form}>
          <h3>
            <b>Change Password</b>
          </h3>
          <div className="form-outline mb-2">
            <label className="form-label">
              Password
            </label>
            <input type="password" id="form23" className="form-control" name="password" value={password} required placeholder="Enter your Password" onChange={onChangePassword} />
          </div>
          <div className="form-outline mb-2">
            <label className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="form24"
              className="form-control"
              name="confirmPassword"
              placeholder="Re-Enter Password"
              required
              value={confirmpassword}
              onChange={onChangeConfirmPassword}
            />
          </div>
        
          <div className="text-center pt-1 mb-2 pb-1">
            <button className="btn btn-success btn-block fa-lg mb-3" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Proceed</span>
            </button>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            {/* <button class="btn btn-success btn-block fa-lg mb-3" type="button">
              Log in
            </button> */}
          </div>
        </form>
      </div>
  );
}
