import React, { useEffect, useState } from "react";
import { Button, Container, Form,FormGroup, Input } from "reactstrap";
import { useParams } from "react-router-dom";
import useAxiosInstance from "../../redux/axiosInstance";

function UpdateCategory(){
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const { categoryId }=useParams();
    const { instance }=useAxiosInstance();

    console.log("id:"+categoryId);
    useEffect(()=>{
        document.title="Update Category"
    }, [])

    const handleTitleChange = (event) => {
        setCategoryName(event.target.value);
      };
    
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };

      const updateCategory=(event)=>{
        event.preventDefault();

        const category = {
            id:categoryId,
            categoryName: categoryName,
            description: description,
          };
        instance.put("/admin/updateCategory",category,{
        //    data: {"id": id},
            headers: {
              'Content-Type': 'application/json'
            }
          })
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
            <h1 className="text-center my-3">Update Category Detail</h1>
            <Form>
                

                <FormGroup>
                    <label for="categoryName"> Category Name</label>
                    <Input type="text" 
                        placeholder="Enter category name"
                        name="categoryName" 
                        id="categoryName"
                        value={categoryName}
                        onChange={handleTitleChange}
                     />
                </FormGroup>

                <FormGroup>
                <label for="description">Description</label>
                <Input 
                        id="description"
                        name="description"
                        type="textarea"
                        placeholder="Enter category description"
                        style={{height:150}}
                        value={description}
                        onChange={handleDescriptionChange}
                />
                </FormGroup>

                <Container className="text-center">
                    {/* <Button color="success" onClick={AddCategory}>Update Category</Button> */}
                    {/* <Link to={`/updateCategory/${category.id}`}> */}
                    <Button color="primary" onClick={updateCategory}>Update Category</Button>
                    {/* </Link> */}
                    <Button color="warning ml-2">Clear</Button>

                </Container>
            </Form>
        </div>
        
    )

};

export default UpdateCategory;