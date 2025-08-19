import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import { useState } from 'react';
function Login() {
     const [formdata, setformdata] = useState({ email: "",password:"" });
     let data = {}
      const handlechange = (e) => {
        const { name, value } = e.target;
        setformdata({ ...formdata, [name]: value });
      };
     
      const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
           const response =await axios.post("https://ecommerce-backend-sf4n.onrender.com/api/v1/auth/login",formdata,{
            // withCredentials:true
        })
            console.log(response)
            data=response.data
            localStorage.setItem("token",response.data.token)
            toast(response.data.message)
        
        } catch (err) {
          toast(err.message)
          console.log(err)
        }
       
      }

  return (
    <>
      <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

      <form
       
        className="bg-white shadow-lg rounded-xl p-6 mb-8"
       onSubmit={handlesubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formdata.email}
           onChange={handlechange}
            placeholder="Enter email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={handlechange}
           
            placeholder="Enter password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white w-full"
        >
          Login
        </button>
      </form>
      </div>
    </>
  )
}

export default Login
