import React from 'react'
import'./sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidedar-options">
            <NavLink to='/user' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>User</p>
            </NavLink>
             <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>subscription </p>
            </NavLink>

             <NavLink to='/buysell' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>BUY/SELL </p>
            </NavLink>

             <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
             <NavLink to='/subscriber'  className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Subscribers</p>
            </NavLink>

        </div>

    </div>
  )
}

export default Sidebar