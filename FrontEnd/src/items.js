
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './items.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import useAxiosInstance  from './redux/axiosInstance';
import { useNavigate ,useParams, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



function ItemsPage() {
    
    const [itemsList, setItemsList] = useState([]);
    const [category, setCategory] = useState([]);
    const [catId, setCatId] = useState(0);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const navigate = useNavigate();
    const { instance } = useAxiosInstance();
    const { vehicleId } = useParams();
    const make=localStorage.getItem("make")
    const model=localStorage.getItem("model")
    const fuel=localStorage.getItem("fuel")

    const fetchCategory = async () => {
        try {
            const response = await axios.get("http://localhost:8080/home/categories");
            setCategory(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchItems = async () => {
        try {
            const response = await instance.get(`http://localhost:8080/home/categories/items/?categoryId=${catId}&vehicleId=${vehicleId}`);
            setItemsList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    useEffect(() => {
        fetchItems();
    }, [catId]);

    const handleClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setCatId(categoryId);
    };
    // const [itemsList, setItemsList] = useState([]);
    // const [category,setCategory]=useState([]);

    //    const navigate=useNavigate();
    //    const {instance}  = useAxiosInstance();

    //    const { vehicleId }= useParams();

    // // useEffect(function(){
    // //     {
            
    // //         console.log(response)
    // //       })
    // //       .then((error)=>(error));
    // //     },[]);
  
    // const sessionStorageCategoryId = (id) => {
    //   sessionStorage.setItem('categoryId', id);
    // };
  
    
    // useEffect(() => {

    //     const categoryId = parseInt(localStorage.getItem("categoryId"));
    //     //  const vehicleId = parseInt(localStorage.getItem("vehicleId"));
    

    //     // Fetch items list based on catId
    //     const fetchCategory = async () => {
    //         try {
    //             axios
    //             .get("http://localhost:8080/home/categories")
    //             .then((response)=>{
    //                 console.log(response.data)
    //                 setCategory(response.data);
    //                 })

    //          fetchItems();
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     const fetchItems = async () => {
    //         try {
    //             instance.get(`http://localhost:8080/home/categories/items/?categoryId=${category.id}&vehicleId=${vehicleId}`)
    //                 .then((response) => {
    //                     setItemsList(response.data)
    //                 })

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };



    //     fetchCategory();

    // }, []);

    const addToCart = (itemId) => {
        
        const userId = parseInt(localStorage.getItem("userId"));
        var isLoggedIn = false;
        
        isLoggedIn = localStorage.getItem("isLoggedIn")
        if (isLoggedIn == "true") {
            const payload = { itemId, userId };
            //alert(instance)
            instance.post('/user/addtocart', payload)
                .then((response) => {
                    console.log(response.data);
                    if(response.data >=1)
                    alert(response.data + ' added successfully');
                    else{
                    alert("Item Already Available in Cart");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            alert("As you are not logged In, redirecting to Login Page");
            // window.location.href = "/login";
            navigate('/login');
        }
    }


    return (
        <div className='catItemContainer'>
             <div className='category'>
                <b style={{fontSize:30, margin:10}}>Services Available</b>
            <Card style={{ width: '18rem', margin:10 }}>
                <ListGroup variant="flush">
                {category.map((category) => (
                
                    <ListGroup.Item key={category.id} className={selectedCategoryId === category.id ? "selected" : ""}>
                        {/* <Link to={`/items/${category.id}`} onClick={() => sessionStorageCategoryId(category.id)}><b>{category.categoryName}</b></Link> */}
                        <Link style={{marginLeft:50}} to={`/items/${category.id}`} onClick={() => handleClick(category.id)}><b>{category.categoryName}</b></Link>
                    </ListGroup.Item>
                ))}

                </ListGroup>
            </Card>
            
            </div>
            
            <div className="items-container">
                
            {itemsList.map((item) => {
                const details = item.detail.split(",");
                const detailItems = details.map((detail, index) => <li key={index}>{detail.trim()}</li>);

                return (
                    <div key={item.id} className="item">
                        <p className="item-name">{item.itemName}</p>
                        <h1 className="item-price">Rs.{item.price}</h1>
                        <ul className="item-details">{detailItems}</ul>
                        <p className="item-pricw">{item.pricw}</p>
                        <button className='btn btn-success' onClick={() => addToCart(item.id)}>Add to cart</button>
                    </div>
                );
            })}
            </div>
            <div className='vehicleName-container'>
                <h5>Fetching details for</h5>
                <h3>{make}-{model}-{fuel}</h3>
                <br></br>
                <><button className='btn btn-info' onClick={()=>navigate('/')}>Change Vehicle</button></>
                
            </div>
        </div>
    );



}

export default ItemsPage;
