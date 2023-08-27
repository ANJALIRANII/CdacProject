import React, { useState, useEffect } from 'react';
import { Button, Container, Form,FormGroup, Input } from "reactstrap";
import useAxiosInstance from '../../redux/axiosInstance';


function AddItems() {
  const [categories, setCategories] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [itemName, setItemName] = useState('');
  const [detail, setDetail] = useState('');
  const [inStock, setInStock] = useState(true);
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { instance }=useAxiosInstance();

  // const handleVehicleId = (event)=>{
  //   const options = event.target.options;
  //   const selectedValues = [];
  //   for (let i = 0; i < options.length; i++) {
  //     if (options[i].selected) {
  //       selectedValues.push(options[i].value);
  //     }
  //   }
  //   setSelectedOptions(selectedValues);
  // }

  console.log(selectedOptions);

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

useEffect(()=>{
    
  instance.get(`/home/allVehicle`).then(
      (response)=>{
          //success
         // console.log(response);
         console.log(response.data)
         //toast.success("Category has been loaded");
         setVehicles(response.data);
      },
      (error)=>{
          //for error
          console.log(error)
          //toast.error("Something went wrong")
      }
  )
  

},[])

const handleSelectedVehicle = (event) => {
  event.preventDefault();

  for(let i=0;i<selectedOptions.length;i++){

    const itemData = { Item:{itemName:itemName, detail:detail, inStock:inStock, price:price, 
      itemCategory:{id:categoryId}
       },
      Vehicle:{
        id:selectedOptions[i]
      }
      };
      async function fetchData(){
        try{
          const response = await instance.post(`/admin/addService`, itemData);
          alert(response.data)
        }
        catch(error) {
           console.log(error);
      }
    
  }
  fetchData();
  }

}


  const handleSubmit = (event) => {
    event.preventDefault();
    const itemData = { itemName:itemName, detail:detail, inStock:inStock, price:price, 
      itemCategory:{id:categoryId}
       };
    instance.post(`/admin/addServiceForAllVehicle`, itemData)
      .then((response) => 
         //      console.log("categoryId:"+categoryId),
              alert(response.data)
              
      )
      .catch(error => console.log(error));
  };
  console.log("categoryId:"+categoryId)
  return (
    <div>
      <h1 className="text-center my-3">Add Item</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label for="itemName">Item Name:</label>
          <Input type="text" id="itemName" value={itemName} onChange={event => setItemName(event.target.value)} placeholder={"Enter Item name"} />
        </FormGroup>
        <FormGroup>
          <label for="detail">Detail:</label>
          <Input type="textarea" id="detail" value={detail} onChange={event => setDetail(event.target.value)} placeholder={"Enter Details"} />
        </FormGroup>
        {/* <FormGroup>
          <label for="inStock">In Stock:</label>
          <Input type="boolean" id="inStock" value={InStock} onChange={event => setInStock(event.target.value)} placeholder={"Enter quantity of Item"} name={inStock}/>
        </FormGroup> */}
        <FormGroup>
          <label for="price">Price:</label>
          <Input type="number" id="price" min="0" value={price} onChange={event => setPrice(event.target.value)} placeholder={"Enter Price"} />
        </FormGroup>
        <FormGroup>
          <label for="category">Category:</label>
          <select id="category" value={categoryId} onChange={event => setCategoryId(event.target.value)}>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.categoryName}</option>
            ))}
          </select>
        </FormGroup>

        
        <Button onClick={handleSubmit}>Add Item for all Vehicle</Button>
        <br></br>
        <br></br>
        
        {/* <FormGroup>
          <label for="vehicle">Vehicle:</label>
          <select multiple={true} id="vehicle" value={vehicleId} onChange={handleVehicleId}>
            <option value="">Select vehicles</option>
            {vehicles.map(vehicle => (
              <option key={vehicle.id} value={vehicle.id}>{vehicle.make+" "+vehicle.model+" "+vehicle.fuel}</option>
            ))}
          </select>
        </FormGroup>

        <Button onClick={handleSelectedVehicle}>Add Item for selected Vehicle</Button> */}
      </Form> 
    </div>
  );
}

export default AddItems;
