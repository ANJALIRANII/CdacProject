import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Logo from '../images/peakauto.jpg';
import { House, Cart, TextWrap } from 'react-bootstrap-icons';
import './headfoot.css';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const role=localStorage.getItem("role");
  const Name=localStorage.getItem("firstName");

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, [location]);

  function handleLogin() {
    
    if (isLoggedIn) {
      localStorage.clear();
      setIsLoggedIn(false);
      alert("successfully Logged Out")
      navigate('/')
    } else {
        
      navigate('/login');
      
    }
  }

  return (
    <div className="col-md-12" style={{ background: 'black', height: '80px' }}>
      
      <div className='namediv'>
      <img src={Logo} alt="Logo" width={270} height={80} />
      <div className='name' >Welcome {Name}</div>
      </div>
      <button className="icon-button left"  
              onClick={() => (role=="USER") ?  navigate('/')  :  (role=="ADMIN")  ?  navigate('/admin')  :        (role=="vendor") ? navigate('/vendor') : navigate('/')} style={{backgroundColor:'black'}} title="Home">
        <House size={30} style={{ color: "white" }} />
      </button>
      <button className="icon-button middle" onClick={() => (role=="USER")? navigate('/cart'):alert("available only for user")} style={{backgroundColor:'black'}} title="Cart">
        <Cart size={30} style={{ color: "white" }} />
      </button>
      <button className='btn btn-danger right' onClick={handleLogin}>
        <b>{isLoggedIn ? "Logout" : "Login"}</b>
      </button>
      
    </div>
  );
}

export default Header;





// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
// import Logo from '../images/peakauto.jpg';
// import { House, Cart } from 'react-bootstrap-icons';
// import './headfoot.css';
// import { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';


// function Header() {
//     const navigate=useNavigate();
//     var nameInsteadLogin="Login";
//     var isLoggedIn=localStorage.getItem("isLoggedIn")

    
//     useEffect(()=>{
//         isLoggedIn=localStorage.getItem("isLoggedIn")
            
//         if ( isLoggedIn== "true") {
//             nameInsteadLogin="Logout"
//         }else {
//             nameInsteadLogin="Login"
//         }
    
    
//     },[isLoggedIn]);
    

//     function handleLogin(){
//         if(isLoggedIn== "true"){
//             localStorage.clear();
//         }
//         navigate('/login');
//         //window.location.href = "/login";
//     }
//     return ( 
//         <div className="col-md-12" style={{background:'black',height:'80px'}}>
//             <img src={Logo} alt="Logo" width={270} height={80} />
//             <House className='left' size={30} style={{color:"white"}}/>
            
//             <Cart className='middle' size={30} style={{color:"white"}} />

//             <button className='btn btn-danger right' onClick={handleLogin}><b>{nameInsteadLogin}</b></button>
            

//         </div>
//     );
// }

// export default Header;