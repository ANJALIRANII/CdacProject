import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import About from './About';
import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './common.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import LandingPage from './Landing';
import Header from './components/Header';
import Footer from './components/Footer';
import ItemsPage from './items';
import UserLogin from './components/Login/UserLogin';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/reduxslice';
import Register from './components/register'
import Cart from './components/cart';
import OrderAddress from './components/orderaddress';
import NewAddress from './components/newaddress';
import AddCategory from './components/admin/AddCategory';
import Allcategories from './components/admin/Showcategories';
import AddVendor from './components/admin/AddVendor';
import ShowAllVendors from './components/admin/ShowAllVendors';
import AddItems from './components/admin/AddItem';
import UpdateCategory from './components/admin/UpdateCategory';
import ItemDetails from './components/admin/ShowItemDetails';
import AddVehicle from './components/admin/AddVehicle';
import VehicleDetails from './components/admin/ShowVehicle';
import UpdateVehicle from './components/admin/UpdateVehicle';
import UpdateItem from './components/admin/UpdateItem';
import Menus from './components/admin/Menus';
import './App.css'
import VendorMenu from './components/vendor/vendormenu';
import Home from './components/vendor/Home';
import Payment from './components/vendor/Payment';
import OrderStatus from './components/vendor/OrderStatus';
import DashBoard from './components/vendor/DashBoard';
import Forget from './components/Login/forget';
import VeryOtp from './components/Login/verifyotp';
import NewPassword from './components/Login/newpassword';
import UpdateUser from './components/updateUser';
import ChangePassword from './components/changePassword';
import NewVehicle from './components/newvehicle';

function App() {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <div>
          <Header />
          <div>
            <Menu className='bm-burger-button'>
              <a className="menu-item" href="/">Home</a>
              <a className="menu-item" href="/updateUser">Update Profile</a>
              <a className="menu-item" href="/changePassword">Change Password</a>
              <a className="menu-item" href="/about">About</a>
              <a className="menu-item" href="/contact">Contact</a>
            </Menu>
          </div>
          <Routes>
            {/*Routes For User */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/Register" element={<Register />} />
            <Route path='/items/:vehicleId' element={<ItemsPage />} />
            <Route path='/cart' exact element={<Cart />} />
            <Route path='/about' exact element={<About />} />
            <Route path='/orderaddress' exact element={<OrderAddress />} />
            <Route path='/newaddress' exact element={<NewAddress />} />
            <Route path='/forget' exact element={<Forget />} />
            <Route path='/verifyotp' exact element={<VeryOtp />} />
            <Route path='/changePass' exact element={<NewPassword />} />
            <Route path='/updateUser' exact element={<UpdateUser />} />
            <Route path='/changePassword' exact element={<ChangePassword />} />
            <Route path='/newvehicle' exact element={<NewVehicle />} />


            

            {/*Routes For Admin */}
            <Route path='/admin/*' element={<AdminRoutes />} />

            {/*Routes For Vendor */}
            <Route path='/vendor/*' element={<VendorRoutes />} />

          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

function AdminRoutes() {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith('/admin') && (
        <div className='catItemContainer'>
         {/* <Container style={{ minHeight: 'calc(100vh - 350px)'}} > */}
          {/* <Row>
            <Col md={4} > */}
            <div className='category'><Menus /></div>
              
            {/* </Col> */}
            {/* <Col md={8}> */}
            <div className="items-container">
              <Routes>
                <Route path="/addcategory" element={<AddCategory />} />
                <Route path="/categories" element={<Allcategories />} />
                <Route path="/addvendor" element={<AddVendor />} />
                <Route path="/showvendor" element={<ShowAllVendors />} />
                <Route path="/additem" element={<AddItems />} />
                <Route path="/updateCategory/:categoryId" element={<UpdateCategory />} />
                {/* <Route path="/updateVehicle" element={<UpdateVehicle/>} /> */}
                <Route path="/showitem" element={<ItemDetails />} />
                <Route path="/addnewvehicle" element={<AddVehicle />} />
                <Route path="/showVehicle" element={<VehicleDetails />} />
                <Route path="/updateVehicle/:vehicleId" element={<UpdateVehicle />} />
                <Route path="/updateItem/:itemId" element={<UpdateItem />} />
              </Routes>
              </div>
            {/* </Col> */}
          {/* </Row> */}
         {/* </Container> */}
        </div>
      )}
    </>
  )
}
function VendorRoutes() {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith('/vendor') && (
        <div className='catItemContainer'>
            <div className='category'>
              < VendorMenu />
            </div>
            <div className="items-container">
              <Routes>

                <Route path="/status" exact element={<Home />} />
                <Route path="/totalincome" exact element={<Payment />} />
                <Route path="/order/changestatus" exact element={<OrderStatus />} />
                <Route path="/users" exact element={<DashBoard />} />
                <Route path="/OrderStatus/:id"  element={<OrderStatus />} />

              </Routes>
              </div>
        </div>
      )}
    </>
  )
}

export default App;
