import React, { useState, useEffect } from "react";
import Category from "./Category";
import useAxiosInstance from "../../redux/axiosInstance";


function Allcategories(){
    const { instance }=useAxiosInstance();


    useEffect(()=>{
        document.title="All Category"
    }, [])

    //function to call server
    const getAllCategories=()=>{
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
    }

    //calling load function
    useEffect(()=>{
        getAllCategories();
    }, [])


    const[categories,setCategories] = useState([
        // {title:"Periodic Services", description:"Must be done every 3 months"},
        // {title:"Wheel care", description:"Wheel Alignment"},
        // {title:"Windshield and Glasses", description:"Replacing them"}
    ])


return(
        <div>
            <h1>All Categories</h1>
            <p>List of Categories are as follows</p>
            
            {
                categories.length>0 ? categories.map((item)=>(
                    <Category key={item.id} category={item} />
                )) : "No Categories"
            }

        </div>
)
}

export default Allcategories;