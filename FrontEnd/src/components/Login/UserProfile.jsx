import { ControlCameraOutlined, ControlPointSharp } from '@material-ui/icons';
import React, { useRef, useState } from 'react'
import authService from '../../service/auth.service';
import userService from '../../service/user-service';

export default function UserProfile(props) {
    const form = useRef();
    const [name, setName] = useState("");
    const username = authService.getCurrentUser().username;
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [bloodGroup, setBloodGroup] = useState("");
    const [area, setArea] = useState("")
    const [locality, setLocality] = useState("");
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [pincode, setPincode] = useState("")
    const [alternateNumber, setAlternateNumber] = useState("")

    console.log(username);
    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    // const onChangeUsername = (e) => {
    //     const username = authService.getCurrentUser.username;
    //     setUsername(username);
    // };
    const onChangePhoneNumber = (e) => {
        const phoneNumber = e.target.value;
        setPhoneNumber(phoneNumber);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangeGender = (e) => {
        const gender = e.target.value;
        setGender(gender);
    };
    const onChangeDateOfBirth = (e) => {
        const dateOfBirth = e.target.value;
        setDateOfBirth(dateOfBirth);
    };
    const onChangeBloodGroup = (e) => {
        const bloodGroup = e.target.value;
        setBloodGroup(bloodGroup);
    };
    const onChangeArea = (e) => {
        const area = e.target.value;
        setArea(area);
    };
    const onChangeLocality = (e) => {
        const locality = e.target.value;
        setLocality(locality);
    };
    const onChangeCity = (e) => {
        const city = e.target.value;
        setCity(city);
    };
    const onChangeState = (e) => {
        const state = e.target.value;
        setState(state);
    };
    const onChangeCountry = (e) => {
        const country = e.target.value;
        setCountry(country);
    };
    const onChangePincode = (e) => {
        const pincode = e.target.value;
        setPincode(pincode);
    };
    const onChangeAlternateNumber = (e) => {
        const alternateNumber = e.target.value;
        setAlternateNumber(alternateNumber);
    };

    const submitUserProfile = (e) => {
        e.preventDefault()

        const data = {
            username, name, phoneNumber, email, gender, dateOfBirth, bloodGroup, 'address':{
                area, locality, city, state, country, pincode
            }, alternateNumber
        }

        console.log(data)
        userService.setUserProfile(data).then((response) => {
            console.log(response)
            props.history.push("/");
            window.location.reload();
        })
        
    };
    return (
        <div className="container">
            <h2 className='my-3'>Complete your profile..</h2>
            <hr></hr>
            <div className='row '>
                <div className="col-md-6 mb-3">
                <form onSubmit={submitUserProfile} ref={form}>
               <div className="row">
                   <div className="col-md-6 mb-3">
         
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control"  name='name' onChange={onChangeName} />
                </div >
                
         
               </div>
               <div className="row">
               <div className="col-md-6 mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" name='phoneNumber' onChange={onChangePhoneNumber} />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" name='email' onChange={onChangeEmail} />
                </div>
               </div>
               <div className="row">
               <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <input type="text" className="form-control" name='gender' onChange={onChangeGender} />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input type="text" className="form-control" name='dateOfBirth' onChange={onChangeDateOfBirth} />
                </div>
               </div>
               <div className="row">
               <div className="col-md-6 mb-3">
                    <label className="form-label">Blood group</label>
                    <input type="text" className="form-control" name='bloodGroup' onChange={onChangeBloodGroup} />
                </div>
                
                <h4 className='my-4'>Address</h4>
                <div className="col-md-6 mb-3">
                    <label className="form-label">House No/Stree Name</label>
                    <input type="text" className="form-control" name='stree' onChange={onChangeArea} />
                </div>
               </div>
               <div className="row">
               <div className="col-md-6 mb-3">
                    <label className="form-label">Locality</label>
                    <input type="text" className="form-control" name='locality' onChange={onChangeLocality} />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" name='city' onChange={onChangeCity} />
                </div>
               </div>
               <div className="row">
               <div className="col-md-6 mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name='state' onChange={onChangeState} />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-control" name='country' onChange={onChangeCountry} />
                </div>
               </div>
              <div className="row">
              <div className="col-md-6 mb-3">
                    <label className="form-label">Pincode</label>
                    <input type="text" className="form-control" name='pincode' onChange={onChangePincode} />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Alternate Phone Number</label>
                    <input type="text" className="form-control" name='state' onChange={onChangeAlternateNumber} />
                </div>
              </div>
                <div className="col-md-6" >
                    <button className="btn btn-primary btn-block my-2">Submit</button>
                </div>
            </form>
                </div>
                <div className="col-md-6" ></div>
           
        </div>
        </div>
    )
}