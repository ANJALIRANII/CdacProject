import React, { useEffect, useState} from "react";
import { Button, Container, Form,FormGroup, Input } from "reactstrap";
import useAxiosInstance from "../../redux/axiosInstance";


function AddCategory(){
    const { instance }=useAxiosInstance();
    const red = "red";

    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(()=>{
        document.title="Add Category"
    }, [])

    
  const handleTitleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const clearCategory =()=>{
    setCategoryName("");
    setDescription("");
  }

    const addCategory=(event)=>{
        event.preventDefault();

        const category = {
            categoryName: categoryName,
            description: description,
          };

        if(!categoryName=="" && !description==""){
            // axios.post("http://localhost:8080/admin/addCategory",category)
            instance.post("/admin/addCategory",category)
        .then(response=>{
            console.log(response.data);
            alert(response.data);
        })
        .catch(error=>{
            console.log(error);
        });
        }else{
            alert("Plz fill the data")
        }
    };

    

    return (
        <div>
            <h1 className="text-center my-3">Fill Category Detail</h1>
            <Form>
                {/* <FormGroup>
                    <label for="categoryId">Category Id</label>
                    <Input type="text" 
                        placeholder="Enter Category Id" 
                        name="categoryId" 
                        id="categoryId"
                    />
                </FormGroup> */}

                <FormGroup>
                    <label for="categoryName">Category Name</label>
                    <Input type="text" 
                        placeholder="Enter Category Name" 
                        name="categoryName" 
                        id="categoryName"
                        value={categoryName}
                        onChange={handleTitleChange}
                        required={true}
                        aria-invalid={!categoryName}
                    />
                    {!categoryName && (
                        <div className="invalid-feedback" style={{color: red}}>Please enter category name.</div>
                    )}
                </FormGroup>

                <FormGroup>
                <label for="description">Description</label>
                <Input 
                        id="description"
                        name="description"
                        type="textarea"
                        placeholder="Enter Description Here"
                        style={{height:150}}
                        value={description}
                        onChange={handleDescriptionChange}
                        required={true}
                        aria-invalid={!description}
                        />
                        {!description && (
                            <div className="invalid-feedback" style={{color: red}}>Please enter a description.</div>
                        )}
                
                </FormGroup>

                <div className="text-center">
                    <Button color="success" onClick={addCategory} style={{marginLeft:10}}>Add Category</Button>
                    <Button color="warning ml-2" onClick={clearCategory} style={{marginRight:10}}>Clear</Button>

                </div>


            </Form>
        </div>
    )

};

export default AddCategory;