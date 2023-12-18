import React, { useEffect, useState } from 'react'
import Login from './loginpages/Login';
import Signup from './loginpages/Signup';
import '../styles/home.css'
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  useEffect(()=>{localStorage.clear();})
    const [type,settype]=useState("login");
  return (
    <>
    <div className='homediv'>
        <div className='home-container'>
        {type==="login"?<Login settype={settype} toast={toast}/>:<Signup settype={settype} toast={toast}/>}
        </div>
        <ToastContainer/>
    </div>
    </>
  )
}

export default Home