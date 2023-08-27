import { useRef ,useState} from "react";
import { useNavigate } from "react-router-dom";
import image from "../images/landing.jpg";
import useAxiosInstance from "../redux/axiosInstance";
import './Login/login.css';

export default function Register(props) {
    const navigate=useNavigate();
    const { instance }=useAxiosInstance();
    const form = useRef();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email , setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const onChangeFirstName = (e) => {
      let firstName = e.target.value;
      setFirstName(firstName);
    };
    const onChangeLastName = (e) => {
        let lastName = e.target.value;
        setLastName(lastName);
      };
      const onChangeEmail = (e) => {
        let email = e.target.value;
        setEmail(email);
      };
      
      const onChangePassword = (e) => {
        let password = e.target.value;
       setPassword(password);
    };
    const onChangeConfirmPassword = (e) => {
        let confirmpassword = e.target.value;
        setConfirmpassword(confirmpassword);
      };
    const onChangeMobile = (e) => {
        let mobile = e.target.value;
        setMobile(mobile);
      };



      const handleRegister = (e) => {
      e.preventDefault();
      setMessage("");
      setLoading(true);

      if (password !== confirmpassword) {
        setLoading(false);
        setMessage("Passwords do not match");
        return;
      }
  
      if (!/^\d{10}$/.test(mobile)) {
        setLoading(false);
        setMessage("Mobile number is invalid");
        return;
      }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        setMessage("Invalid email address");
        setLoading(false);
        return;
      }
        const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})/;
        if (!passwordRegex.test(password)) {
        setMessage("Password must contain at least one digit, one lowercase letter, one of the following special characters (#@$*), and be between 5 and 20 characters in length.");
        setLoading(false);
        return;
        }

        const payload={
          'firstName': firstName,
          'lastName': lastName,
          'email': email,
          'password': password,
          'mobileNo':mobile
        };

        const user=localStorage.getItem("user");
        if(user!==null){
          const role = JSON.parse(user)['role'];
          if(role=="ADMIN"){
                instance.post('/admin/addvendor', payload)
                .then((response) => {
                    console.log(response.data);
                    alert(response.data + ' added successfully');
                })
                .catch((error) => {
                    console.error(error);
                });
          }
        } else {
          instance.post('/home/adduser', payload)
                .then((response) => {
                    console.log(response.data);
                    alert(email + ' added successfully \n Redirecting to Login ');
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
                  setMessage("email Already Available plz login");
                });
        }
       

      
    };
  
    return (
      <div>
        <img src={image}  className="card-img-top rounded-3" alt="..." />
  
        <form className="register" onSubmit={handleRegister} ref={form}>
          <h3>
            <b>Let's Be Part Of Our Family</b>
          </h3>
  
          <div className="form-outline mb-2">
            <label className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="form2"
              className="form-control"
              name="firstName"
              placeholder="Enter your First Name"
              value={firstName}
              required
              onChange={onChangeFirstName}
            />
          </div>
          <div className="form-outline mb-2">
            <label className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="form3"
              className="form-control"
              name="lastName"
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={onChangeLastName}
            />
          </div>
          <div className="form-outline mb-2">
            <label className="form-label">
              Email
            </label>
            <input
              type="email"
              id="form4"
              className="form-control"
              name="email"
              placeholder="Enter your Email"
              required
              value={email}
              onChange={onChangeEmail}
            />
          </div>
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
          <div className="form-outline mb-2">
            <label className="form-label">
              Mobile
            </label>
            <input
              type="number"
              id="form5"
              className="form-control"
              name="mobile"
              placeholder="Enter your Mobile Number"
              required
              value={mobile}
              onChange={onChangeMobile}
            />
          </div>
        
          <div className="text-center pt-1 mb-2 pb-1">
            <button className="btn btn-success btn-block fa-lg mb-3" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Register</span>
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