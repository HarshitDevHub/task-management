'use client'
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react'

const Login = () => {
  const [userData, setUserData] = useState({email:"",password:""});
  const [formReady, setFormReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userData.email.length > 0 && userData.password.length > 0) {
      setFormReady(true);
    } else {
      setFormReady(false);
    }
  }, [userData.email, userData.password]);


    const handleLogin = async(e)=>{
      try {
        e.preventDefault();
        setLoading(true)
        setFormReady(false)
        const response = await axios.post('/api/users/login/',userData)
        if (!response.data.success) {
          toast.error(response.data.error)
        }else{
        router.push('/task')
        }
        console.log(response) 
      } catch (error) {
        console.log("Error during login:",error)
      }finally{
        setLoading(false)
        setFormReady(true)
      }
     
    }
  return (
    <div className="min-w-full max-w-xs min-h-screen flex justify-center items-center">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="email"
          placeholder="Enter your email"
          onChange={(e)=> setUserData((user)=> ({...user, email:e.target.value}))}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          onChange={(e)=> setUserData((user)=> ({...user, password:e.target.value}))}
        />
        <p className="text-red-500 text-xs italic">*Please enter a password.</p>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled = {!formReady}
        >
          {loading ? (
            <svg width="20" height="20" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
            <g fill="none" fillRule="evenodd" strokeWidth="2">
                <circle cx="22" cy="22" r="1">
                    <animate attributeName="r"
                        begin="0s" dur="1.8s"
                        values="1; 20"
                        calcMode="spline"
                        keyTimes="0; 1"
                        keySplines="0.165, 0.84, 0.44, 1"
                        repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity"
                        begin="0s" dur="1.8s"
                        values="1; 0"
                        calcMode="spline"
                        keyTimes="0; 1"
                        keySplines="0.3, 0.61, 0.355, 1"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="22" cy="22" r="1">
                    <animate attributeName="r"
                        begin="-0.9s" dur="1.8s"
                        values="1; 20"
                        calcMode="spline"
                        keyTimes="0; 1"
                        keySplines="0.165, 0.84, 0.44, 1"
                        repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity"
                        begin="-0.9s" dur="1.8s"
                        values="1; 0"
                        calcMode="spline"
                        keyTimes="0; 1"
                        keySplines="0.3, 0.61, 0.355, 1"
                        repeatCount="indefinite" />
                </circle>
            </g>
        </svg>
          ):"Sign In"}
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
      <Link href='/signup' className='text-sm text-gray-600 hover:text-blue-600 pt-4 inline-block'>Dont have account?</Link>
    </form>
  
  </div>
  
  )
}

export default Login