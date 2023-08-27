import { useRef ,useState} from "react";
import { useNavigate } from "react-router-dom";
import image from "../images/landing.jpg";
import useAxiosInstance from "../redux/axiosInstance";
import './Login/login.css';

export default function UpdateUser(props) {

  const user = JSON.parse(localStorage.getItem('user'));

  var fName=user.firstName
  var lName=user.lastName
  var mail=user.email
  var mbleNo=user.mobileNo

  console.log('fName: '+fName);
  console.log('lName: '+lName);
  console.log('mail: '+mail);
  console.log('mbleNo: '+mbleNo);

    const navigate=useNavigate();
    const { instance }=useAxiosInstance();
    const form = useRef();
    const [firstName, setFirstName] = useState(fName);
    const [lastName, setLastName] = useState(lName);
    const [email , setEmail] = useState(mail);
    const [mobile, setMobile] = useState(mbleNo);
   
  
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
      
    
    const onChangeMobile = (e) => {
        let mobile = e.target.value;
        setMobile(mobile);
      };



      const handleUserUpdate = (e) => {
      e.preventDefault();
      setMessage("");
      setLoading(true);

    //   if (password !== confirmpassword) {
    //     setLoading(false);
    //     setMessage("Passwords do not match");
    //     return;
    //   }
  
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
     

        const payload={
          'firstName': firstName,
          'lastName': lastName,
          'email': email,
          'mobileNo':mobile,
          'id':localStorage.getItem("userId")
        };

        instance.put('/user/updateUser', payload)
        .then((response) => {
            console.log(response.data);
            alert(email + ' updated successfully');
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
          setMessage("Failed to update profile");
        });

        // const user=localStorage.getItem("user");
        // if(user!==null){
        //   const role = JSON.parse(user)['role'];
        //   if(role=="ADMIN"){
        //         instance.post('/admin/addvendor', payload)
        //         .then((response) => {
        //             console.log(response.data);
        //             alert(response.data + ' added successfully');
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         });
        //   }
        // } else {
         
        // }
       

      
    };
  
    return (
      <div>
        <img src={image}  className="card-img-top rounded-3" alt="..." />
  
        <form className="register" onSubmit={handleUserUpdate} ref={form}>
          <h3>
            <b>Update Profile</b>
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