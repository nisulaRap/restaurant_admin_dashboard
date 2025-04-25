import React from 'react'
import './Sidebar.css'
import { assets } from '../../../assets/assets';
import { NavLink } from 'react-router-dom'
//import { useContext } from 'react'

const Sidebar = () => {

  // const {user} = useContext(AuthContext)
  return (
    <div className='sidebar'>
      <div className='options'>
        <NavLink to='/ResturantAdmin' className='sidebar-option'>
          <img className='dashboard' src={assets.dashboard_icon} alt='' />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to='/addrestaurant' className='sidebar-option'>
          <img className='add-menu' src={assets.restaurant_icon} alt='' />
          <p>Add Restaurant</p>
        </NavLink>
        <NavLink to='/restaurantlists' className='sidebar-option'>
          <img className='menu-lists' src={assets.menu_icon} alt='' />
          <p>Restaurant Items</p>
        </NavLink>
        <NavLink to='/addmenu' className='sidebar-option'>
          <img className='add-menu' src={assets.add_icon} alt='' />
          <p>Add Menu</p>
        </NavLink>
        <NavLink to='/menulists' className='sidebar-option'>
          <img className='menu-lists' src={assets.menu_icon} alt='' />
          <p>Menu Items</p>
        </NavLink>
        <NavLink to='/orders' className='sidebar-option'>
          <img className='order-icon' src={assets.order_icon} alt='' />
          <p>Order History</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar