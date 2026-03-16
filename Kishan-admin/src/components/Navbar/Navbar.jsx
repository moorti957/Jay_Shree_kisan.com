import React from 'react'
import'./Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navdar'>
     <h1><span className='jay'>Jay</span> Shree Kisan</h1>
     <button className='logout-button-1'
  onClick={() => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  }}
>
   Lock
</button>
   <img src={assets.profile_image} className='profile' alt="" />
   
    </div>
  )
}

export default Navbar