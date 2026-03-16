import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import List from './pages/List/Subscription'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import Subscribers from './pages/Subscribe/Subscribers'
import User from './pages/Add/User'
import BuySell from './pages/BUYSELL/BuySell'
import AdminRoute from './components/AdminRoute'
import Login from './pages/Login'

const App = () => {
  const url = "http://localhost:4000"

  return (
    <div>
      <ToastContainer/>
      
      <Routes>
        {/* ✅ Login Page */}
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Admin Panel */}
        <Route
          path="/*"
          element={
            <AdminRoute>
              <div>
                <Navbar />
                <hr />
                <div className="app-content">
                  <Sidebar />
                  <Routes>
                    <Route path='/user' element={<User url={url}/>}/>
                    <Route path='/list' element={<List url={url}/>}/>
                    <Route path='/buysell' element={<BuySell url={url}/>}/>
                    <Route path='/orders' element={<Orders url={url}/>}/>
                    <Route path='/subscriber' element={<Subscribers url="http://localhost:5000"/>}/>
                  </Routes>
                </div>
              </div>
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App;
