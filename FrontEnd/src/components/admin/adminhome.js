// import AddCategory from "./AddCategory";
// import AddItems from "./AddItem";
// import AddVehicle from "./AddVehicle";
// import AddVendor from "./AddVendor";
// import ShowAllVendors from "./ShowAllVendors";
// import Allcategories from "./Showcategories";
// import ItemDetails from "./ShowItemDetails";
// import VehicleDetails from "./ShowVehicle";
// import UpdateCategory from "./UpdateCategory";
// import UpdateItem from "./UpdateItem";
// import UpdateVehicle from "./UpdateVehicle";
// import { Container } from "reactstrap";
// import { Col, Row } from "reactstrap";
// import Menus from "./Menus";
// import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from '../../redux/reduxslice';




// function AdminHome() {
//     const location=useLocation();
//     const store = configureStore({
//         reducer: {
//           auth: authReducer,
//         },
//       });
//     return (
//         <>
//         {location.pathname.startsWith('/admin') && (
//           <Container>
//             <Row>
//               <Col md={4}>
//                 <Menus />
//               </Col>

//               <Col md={8}>
//               <Routes>
//                 <Route path="/addcategory" element={<AddCategory />}  />
//                 <Route path="/categories" element={<Allcategories />}  />
//                 <Route path="/addvendor" element={<AddVendor />}  />
//                 <Route path="/showvendor" element={<ShowAllVendors />}  />
//                 <Route path="/additem" element={<AddItems />}  />
//                 <Route path="/updateCategory/:categoryId" element={<UpdateCategory />} />
//                 {/* <Route path="/updateVehicle" element={<UpdateVehicle/>} /> */}
//                 <Route path="/showitem" element={<ItemDetails />} />
//                 <Route path="/addnewvehicle" element={<AddVehicle />} />
//                 <Route path="/showVehicle" element={<VehicleDetails />}/>
//                 <Route path="/updateVehicle/:vehicleId" element={<UpdateVehicle />} />
//                 <Route path="/updateItem/:itemId" element={<UpdateItem />} />
//               </Routes>
//               </Col>
//             </Row>
//           </Container>
//        )}</>
//     )
// }

// export default AdminHome;