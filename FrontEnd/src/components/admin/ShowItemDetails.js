import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Form,FormGroup } from 'reactstrap';
import useAxiosInstance from '../../redux/axiosInstance';

function ItemDetails() {
  const [itemData, setItemData] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const { instance }=useAxiosInstance();

  useEffect(() => {
    async function fetchItemData() {
      const response = await instance.get(`/admin/category/items/?categoryId=${categoryId}`);
      const data = response.data;
      setItemData(data);     
    }
    fetchItemData();
  }, [categoryId]);

  

  useEffect(()=>{
    
      instance.get(`/home/categories`).then(
          (response)=>{
              //success
             // console.log(response);
             console.log(response.data)
             //toast.success("Category has been loaded");
             setCategories(response.data);
          },
          (error)=>{
              //for error
              console.log(error)
              //toast.error("Something went wrong")
          }
      )
      
  
  },[])

  
  const deleteItem= async (itemId)=>{
    try {
         const response = await instance.delete('/admin/deleteService', {
           data: {"id": itemId },
           headers: {
             'Content-Type': 'application/json'
           }
         });
     
         if (response.status === 200) {
           // Category deleted successfully
           console.log(`Item with ID ${itemId} has been deleted`);
         } 
         else {
           // Category deletion failed
           console.error(`Failed to delete item with ID ${itemId}`);
         }
         window.location.reload();
       } 
       catch (error) {
         console.error(`An error occurred while deleting item with ID ${itemId}: ${error}`);
       }
   }

 

  useEffect(()=>{
    document.title="Show Item Details"
}, [])

  return (
    <div>
    <h1 className="text-center my-3">Item Details</h1>
    <hr></hr>
    <Form>
    <FormGroup>
          <label for="category">Category:</label>
          <select id="category" value={categoryId} onChange={event => setCategoryId(event.target.value)}>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.categoryName}</option>
            ))}
          </select>
        </FormGroup>
    </Form>
    <Table striped bordered hover className="custom-table">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Detail</th>
          <th>In Stock</th>
          <th>Price</th>
          
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {itemData.map((item) => (
          <tr key={item.id}>
            <td>{item.itemName}</td>
            <td>{item.detail}</td>
            <td>{item.inStock > 0 ? item.inStock : 'Out of Stock'}</td>
            <td>{item.price} USD</td>
            
            <td>
              
              <Link to={`/admin/updateItem/${item.id}`} id={item.id}><Button color="warning">Update</Button></Link>
              <Button color="danger" onClick={()=>deleteItem(item.id)}>Delete</Button>
              {/* <Button color="danger" >Delete</Button> */}
            </td>

          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
}

export default ItemDetails;