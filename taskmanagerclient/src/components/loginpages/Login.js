import React, { useRef } from 'react'
import '../../styles/login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login({settype,toast}) {
    const lemailref=useRef();
    const lpwdref=useRef();
    const navigate = useNavigate();

    function toasterror(msg){
        toast.error(msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    }

    function validEmail(email) {
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(validRegex)) {
          return true;
        } else {
          return false;
        }
      }

    function validate(){
        if(!(lemailref.current.value)){
            toasterror("Enter Email/mobile");
            return false;
        }else if(!(lpwdref.current.value)){
            toasterror("Enter Password");
            return false;
        }else {
            return true;
        }
    }

    async function loginproc(){
        try{
        const res=await axios.post('https://task-manager-zzue.onrender.com/taskmanager/login',{
            selector:validEmail(lemailref.current.value)?"email":"contact",
            userid:lemailref.current.value,
            password:lpwdref.current.value,
        })
        if(res.status===200){
           
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("id",res.data.id);
            navigate("/dash", { replace: true });
        }
    }catch(e){
        toasterror(e.response.data.message);
    }
    }

  return (
    <>
    <h2>LOGIN</h2>
    <input type='text' placeholder='Email/Mobile no' ref={lemailref} className='loginemail'/>
    <br/>
    <input type='password' placeholder='Password' ref={lpwdref} className='loginpwd'/>
    <br/>
    <span className='signupspan' onClick={()=>{settype("signup")}}>SIGNUP</span>
    <button className='loginbtn' onClick={()=>{
        if(validate()){
            loginproc();
        }
    }}>LOGIN</button>
    
    </>
  )
}

export default Login