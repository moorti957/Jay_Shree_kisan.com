import React from 'react'
import './Profile.css'

const Profile = () => {
     
  return (
    <div className='profile'>
        <form action="">
            <h1>Welcome to Saraswati murti kala kendra</h1>
            <label htmlFor="">Gmail Id</label>
            <input type="gamil" required placeholder='abc@mail.com'   />
    
              <label htmlFor="">Password</label>
            <input type="Password" required placeholder='abc@mail.com'   />

        </form>
    </div>
  )
}

export default Profile