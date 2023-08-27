import { useRef ,useState} from "react";
import { useNavigate } from "react-router-dom";
import image from "../images/landing.jpg";
import useAxiosInstance from "../redux/axiosInstance";
import './Login/login.css';

export default function ChangePassword(props) {
    const navigate=useNavigate();
    const { instance }=useAxiosInstance();
    const form = useRef();
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeOldPassword = (e) => {
        let oldPassword = e.target.value;
       setOldPassword(oldPassword);
    };

    const onChangePassword = (e) => {
        let password = e.target.value;
       setPassword(password);
    };
    const onChangeConfirmPassword = (e) => {
        let confirmpassword = e.target.value;
        setConfirmpassword(confirmpassword);
      };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
  
        if (password !== confirmpassword) {
          setLoading(false);
          setMessage("Passwords do not match");
          return;
        }
        
    const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})/;
        if (!passwordRegex.test(password)) {
        setMessage("Password must contain at least one digit, one lowercase letter, one of the following special characters (#@$*), and be between 5 and 20 characters in length.");
        setLoading(false);
        return;
        }

    const payload={
            'password': oldPassword,
           
            'id':localStorage.getItem("userId")
          };
    
    const newPayload={
            'password': password,
           
            'id':localStorage.getItem("userId")
          };


        instance.post('/user/matchPassword', payload)
          .then((response) => {
              console.log(response.data);
              if((response.data)=="Success"){
                instance.put('/user/updatePassword', newPayload)
                    .then((response)=>{
                        alert(response.data);
                        navigate('/login');
                    })
                    .catch((error) =>  {
                        //toast.error("Error")
                        const resMessage =
                          (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                          error.message ||
                          error.toString();
                        setLoading(false);
                        if(resMessage=="could not execute statement; SQL [n/a]; constraint [users.UK_6dotkott2kjsp8vw4d0m25fb7]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement")
                        setMessage("Failed to update password");
                      })
              }
              else{
                setMessage("Old password is not correct,Please check your old password");
              }
          })
          .catch((error) =>  {
            //toast.error("Error")
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setLoading(false);
            if(resMessage=="could not execute statement; SQL [n/a]; constraint [users.UK_6dotkott2kjsp8vw4d0m25fb7]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement")
            setMessage("Failed to change Password");
          });
          
  }
    return(
    <div>
            <img src={image}  className="card-img-top rounded-3" alt="..." />

            <form className="register" onSubmit={handlePasswordUpdate} ref={form}>
                <h3>
                    <b>Change Password</b>
                </h3>


                <div className="form-outline mb-2">
                    <label className="form-label">
                        Old Password
                    </label>
                    <input
                        type="password"
                        id="form22"
                        className="form-control"
                        name="oldPassword"
                        placeholder="Enter old Password"
                        required
                        value={oldPassword}
                        onChange={onChangeOldPassword}
                    />
                </div>

                <div className="form-outline mb-2">
                    <label className="form-label">
                            New Password
                    </label>
                    <input type="password" id="form23" className="form-control" name="password" value={password} required placeholder="Enter New Password" onChange={onChangePassword} />
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
                        <span>Update</span>
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