import React from "react";
import { Link,Params } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardText, Button, Container} from "reactstrap";
import useAxiosInstance from "../../redux/axiosInstance";

import "./Category.css";

function Category({ category }){

  const { instance }=useAxiosInstance();

  const deleteCategory= async (categoryId)=>{
   try {
        const response = await instance.delete('/admin/category', {
          data: {"categoryId": categoryId },
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (response.status === 200) {
          // Category deleted successfully
          console.log(`Category with ID ${categoryId} has been deleted`);
        } 
        else {
          // Category deletion failed
          console.error(`Failed to delete category with ID ${categoryId}`);
        }
        window.location.reload();
      } 
      catch (error) {
        console.error(`An error occurred while deleting category with ID ${categoryId}: ${error}`);
      }
  };
    
  //}

  return (
    <Card className="text-center">
      
      <CardBody>
        <CardSubtitle>
          <b>{category.categoryName}</b>
        </CardSubtitle>
        <CardText>{category.description}</CardText>
        <Container className="text-center">
          <Button color="danger" onClick={()=>deleteCategory(category.id)}>Delete</Button>
          {/* <Button color="warning" ml-3>Update</Button> */}
          <Link to={`/admin/updateCategory/${category.id}`} id={category.id}><Button color="warning">Update</Button></Link>
        </Container>
      </CardBody>
    </Card>
  );
};
export default Category;
