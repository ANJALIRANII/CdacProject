import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../redux/axiosInstance";
import './cart.css'
import OrderAddress from "./orderaddress";


function Cart(){
    const[itemsList, setItemsList]= useState([]);
    const[cart, setCart]=useState();
    const { instance } = useAxiosInstance();
    const navigate=useNavigate();
    const userId=parseInt(localStorage.getItem("userId"));
    const isLoggedIn=localStorage.getItem("isLoggedIn");
    
    


    const fetchItems = async () => {
        const payload={
            "id":userId
        }
        console.log("userId :"+localStorage.getItem("userId"))
        try {
           await instance.post('/user/cart', payload).then((response)=>{
                setCart(response.data);
                console.log(response.data)
                setItemsList(response.data.items);
                console.log(response.data.items)
            })
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(isLoggedIn=="true")
        fetchItems(); 
    }, [])
     
    const removeFromCart = async (id)=>{

        const payload={
            "itemId":id,
            "userId":userId
        }
        
        await instance.post('/user/removefromcart', payload).then((response) => {
            console.log(response.data);
            // if(response.data >=1)
            alert(response.data + ' Removed From Cart successfully');
            // else{
            // alert("Item Already Available in Cart");
            // }
            fetchItems(); 
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const handleCheckout=async(totalPrice)=>{
        if(totalPrice>10){
            localStorage.setItem("orderItems",cart)
            
            navigate('/orderaddress', { state: { "totalPrice": totalPrice } });

        }else{
            alert("plz add items to carts")
        }
    }

    
    return( 

        <div class="cart-container">
            <div class="left-container">
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
                                <button className='btn btn-danger' onClick={() => removeFromCart(item.id)} >Remove From Cart</button>
                            </div>
                    )})}
                </div>
            </div>
            <div class="right-container">
                <div class="cart-summary">
                    <br></br>
                    <div class="updated-date">Updated Date: <span id="updated-date">{cart && cart.updatedDate}</span></div>
                    <div class="total-items">Total Items: <span id="total-items">{cart && cart.totalItems}</span></div>
                    <div class="total-price">Total Price: <span id="total-price">Rs. {cart && cart.totalPrice}/-</span></div>
                    <button class="checkout-btn" title="Proceed to Place order" onClick={()=>(isLoggedIn=="true") ? handleCheckout(cart.totalPrice) : navigate('/login')}>Checkout</button>
                    <br></br>
                </div>
            </div>
        </div>
    );
        
}
export default Cart;
