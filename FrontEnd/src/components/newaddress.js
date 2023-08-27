import { useRef ,useState} from "react";
import { useNavigate } from "react-router-dom";
import image from "../images/landing.jpg";
import useAxiosInstance from "../redux/axiosInstance";
import './Login/login.css';

export default function NewAddress(props) {
    const navigate=useNavigate();
    const { instance }=useAxiosInstance();
    const form = useRef();
    

    const [flatNo, setFlatNo] = useState("");
    const [locality, setLocality] = useState("");
    const [city , setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const onChangeFlatNo = (e) => {
      let flatNo = e.target.value;
      setFlatNo(flatNo);
    };
    const onChangeLocality = (e) => {
        let locality = e.target.value;
        setLocality(locality);
      };
      const onChangeCity = (e) => {
        let city = e.target.value;
        setCity(city);
      };
      
      const onChangePincode = (e) => {
        let pincode = e.target.value;
        setPincode(pincode);
    };

      const handleAddAddress = (e) => {
      e.preventDefault();
      setMessage("");
      setLoading(true);
  
      if (!/^\d{6}$/.test(pincode)) {
        setLoading(false);
        setMessage("Pincode is invalid");
        return;
      }
      if (!/^.{1,10}$/.test(flatNo)) {
        setLoading(false);
        setMessage("Flat No can be Upto 10 alphabates only");
        return;
      }
      if (!/^.{1,30}$/.test(locality)) {
        setLoading(false);
        setMessage("Flat No can be Upto 30 alphabates only");
        return;
      }
      if (!/^.{1,40}$/.test(city)) {
        setLoading(false);
        setMessage("Flat No can be Upto 40 alphabates only");
        return;
      }

      const userId=parseInt(localStorage.getItem("userId"));
        const payload={
            "flatNo": flatNo,
            "locality": locality,
            "city": city,
            "pincode": pincode,
            "owner":{
                "id":userId
            }
        };

        instance.post('/user/adduseraddress', payload)
                .then((response) => {
                    console.log(response.data);
                    alert(response.data + ' added successfully');
                    setLoading(false)
                    setFlatNo("");
                    setCity("")
                    setLocality("")
                    setPincode("")
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
                  setMessage(resMessage);
                });
        }
       
  
    return (
      <div>
        <img src={image}  className="card-img-top rounded-3" alt="..." />
  
        <form className="register" onSubmit={handleAddAddress} ref={form}>
          <h3>
            <b>For Better Contact & Timely Services </b>
          </h3>
          <div className="form-outline mb-2">
            <label className="form-label">
              Flat No :
            </label>
            <input
              type="text"
              id="form2"
              className="form-control"
              name="flatNo"
              placeholder="flat No like (A-507)"
              value={flatNo}
              required
              onChange={onChangeFlatNo}
            />
          </div>
          <div className="form-outline mb-2">
            <label className="form-label">
              Locality :
            </label>
            <input
              type="text"
              id="form3"
              className="form-control"
              name="locality"
              placeholder="Enter your Locality"
              value={locality}
              onChange={onChangeLocality}
            />
          </div>
          <div className="form-outline mb-2">
            <label className="form-label">
              City :
            </label>
            <input
              type="text"
              id="form4"
              className="form-control"
              name="city"
              placeholder="Enter your city"
              required
              value={city}
              onChange={onChangeCity}
            />
          </div>
          
          <div className="form-outline mb-2">
            <label className="form-label">
              Pincode :
            </label>
            <input
              type="number"
              id="form5"
              className="form-control"
              name="pincode"
              placeholder="Enter your city pincode"
              required
              value={pincode}
              onChange={onChangePincode}
            />
          </div>
        
          <div className="text-center pt-1 mb-2 pb-1">
            <button className="btn btn-success btn-block fa-lg mb-3" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Add Address</span>
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