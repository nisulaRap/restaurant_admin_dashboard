import React from "react";

import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
import { Routes,Route } from "react-router-dom";

//system admin
import ResturantApproval from './Components/SystemAdmin/Approval/ResturantApproval';
import DeliveryPersonApproval from "./Components/SystemAdmin/Approval/DeliveryPersonApproval";
import AdminDashBoard from "./Components/SystemAdmin/AdminDashBoard/AdminDashBoard";
import FundTransfer from "./Components/SystemAdmin/FundTransfer/FundTransfer";
import RejectedResturants from "./Components/SystemAdmin/Rejected/RejectedResturants";


//customer
import Customer from "./Components/Customer/Customer";

//resturnat
//import Resturant from "./Components/Resturant/Resturant";
//import Sidebar from "./Components/Resturant/Sidebar/Sidebar";
import Dashboard from "./Components/Resturant/Pages/Dashboard/Dashboard";
import Menulists from "./Components/Resturant/Pages/Menulists/Menulists";
import AddMenu from "./Components/Resturant/Pages/AddMenu/Addmenu";
import UpdateMenu from "./Components/Resturant/Pages/UpdateMenu/UpdateMenu";
import UpdateRestaurant from "./Components/Resturant/Pages/UpdateRestaurant/UpdateRestaurant";
import Restaurantlists from "./Components/Resturant/Pages/Restaurantlists/Restaurantlists";
import AddRestaurant from "./Components/Resturant/Pages/AddRestaurant/AddRestaurant";
import Orders from "./Components/Resturant/Pages/Orders/Orders";

//delivery Person
import DeliveryPerson from "./Components/DeliveryPerson/DeliveryPerson";

//common
import LandingPage from "./Common/LandingPage/LandingPage";
import Login from "./Common/Login/Login";
import Header from "./Common/Header/Header";
import RegisterDirection from './Common/Register/RegisterDirection/RegisterDirection'
import CustomerRegister from './Common/Register/CustomerRegistration/CustomerRegister'
import DileveryPersonRegistration from './Common/Register/DileveryPersonRegistration/DileveryPersonRegistration'
import ResturantRegistration from './Common/Register/ResturantRegistration/ResturantRegistration'

function App(){

  
const {user} = useContext(AuthContext);

  return(
    <>
    <Header/>
    <Routes>
    {
      user ? (
        <>
        {
            user.role ==="SystemAdmin" && (
              <>
                <Route path="/ResturantApproval" element={<ResturantApproval/>}/>
                <Route path="/DeliveryPersonApproval" element={<DeliveryPersonApproval/>}/>
                <Route path="/AdminDashBoard" element={<AdminDashBoard/>}/>
                <Route path="/FundTransfer" element={<FundTransfer/>}/>
                <Route path='/register' element={<RegisterDirection />} />
                <Route path='/DileveryPersonRegistration' element={<DileveryPersonRegistration />} />
                <Route path='/ResturantRegistration' element={<ResturantRegistration />} />
                <Route path="/RejectedResturants" element={<RejectedResturants/>}/>
                
              </>
                
            )
        }

        {
          user.role ==="Customer" &&(
            <Route path="/Customer" element={<Customer/>}/>
          ) 
        }

        {
          user.role==="ResturantAdmin" &&(
          <>
            <Route path="/ResturantAdmin" element={<Dashboard />} />
            <Route path="/addmenu" element={<AddMenu />} />
            <Route path="/update/:id" element={<UpdateMenu />} />
            <Route path="/menulists" element={<Menulists />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/addrestaurant" element={<AddRestaurant />} />
            <Route path="/restaurantlists" element={<Restaurantlists />} />
            <Route path="/updaterestaurant/:id" element={<UpdateRestaurant />} />
          </>
          )
        }

        {
          user.role==="DeliveryPerson" &&(
            <Route path="/DeliveryPerson" element={<DeliveryPerson/>}/>
          )
        }
        </>
      ):(
      <>
        <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<RegisterDirection />} />
            <Route path='/CustomerRegister' element={<CustomerRegister />} />
            <Route path='/DileveryPersonRegistration' element={<DileveryPersonRegistration />} />
            <Route path='/ResturantRegistration' element={<ResturantRegistration />} />
      </>
      )
      
    }
     </Routes>
    </>
  )

}

export default App;