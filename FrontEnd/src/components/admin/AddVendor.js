import React, { useEffect, useState } from "react";
import { Button, Container, Form,FormGroup, Input } from "reactstrap";
import useAxiosInstance from "../../redux/axiosInstance";

function AddVendor(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const { instance } = useAxiosInstance();

    useEffect(()=>{
        document.title="Add Vendor"
    }, [])

    const clearVendor =()=>{
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setMobileNo("");
      }

    const handleFNameChange = (event) => {
        setFirstName(event.target.value);
      };

    const handleLNameChange = (event) => {
        setLastName(event.target.value);
      };

    const handleMobileNoChange = (event) => {
        setMobileNo(event.target.value);
      };

      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };

      const addVendor=(event)=>{
        event.preventDefault();

        const vendor = {
            firstName: firstName,
            lastName: lastName,
            email:email,
            mobileNo:mobileNo,
            password:password,
            role:"VENDOR"
          };
        instance.post(`/home/adduser`,vendor)
        .then(response=>{
            console.log(response.data);
            alert(response.data);
        })
        .catch(error=>{
            console.log(error);
        });
    };

    return (
        <div>
            <h1 className="text-center my-3">Fill Vendor Detail</h1>
            <Form>
                {/* <FormGroup>
                    <label for="vendorId">Vendor Id</label>
                    <Input type="text" 
                        placeholder="Enter Vendor Id" 
                        name="vendorId" 
                        id="vendorId"
                    />
                </FormGroup> */}

                <FormGroup>
                    <label for="vendorFName">Vendor First Name</label>
                    <Input type="text"  
                        name="vendorFName" 
                        id="vendorFName"
                        placeholder="Enter First name"
                        value={firstName}
                        onChange={handleFNameChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label for="vendorLName">Vendor Last Name</label>
                    <Input type="text" 
                        name="vendorLName" 
                        id="vendorLName"
                        placeholder="Enter Last name"
                        value={lastName}
                        onChange={handleLNameChange}
                    />
                </FormGroup>

                {/* <FormGroup>
                <label for="address">Address</label>
                <Input 
                        id="address"
                        name="address"
                        type="text"
                      //  placeholder="Enter Description Here"
                       // style={{height:150}}
                />
                </FormGroup> */}

                <FormGroup>
                <label for="mobile">Mobile No.</label>
                <Input 
                        id="mobile"
                        name="mobile"
                        type="text"
                        placeholder="Enter mobile number"
                        value={mobileNo}
                        onChange={handleMobileNoChange}
                />
                </FormGroup>

                <FormGroup>
                <label for="email">Email Id</label>
                <Input 
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={handleEmailChange}                      
                />
                </FormGroup>

                
                {/* <FormGroup>
                <label for="username">Username</label>
                <Input 
                        id="username"
                        name="username"
                        type="text"                      
                />
                </FormGroup> */}

                
                <FormGroup>
                <label for="password">Password</label>
                <Input 
                        id="password"
                        name="password"
                        type="text" 
                        placeholder="Enter Password"
                        value={password}
                        onChange={handlePasswordChange}                     
                />
                </FormGroup>

                <Container className="text-center">
                    <Button color="success" onClick={addVendor}>Add Vendor</Button>
                    <Button color="warning ml-2" onClick={clearVendor}>Clear</Button>

                </Container>


            </Form>
        </div>
    )

};

export default AddVendor;