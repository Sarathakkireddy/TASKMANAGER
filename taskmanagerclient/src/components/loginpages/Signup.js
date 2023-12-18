import React, { useRef } from 'react'
import '../../styles/signup.css'
import axios from 'axios';

function Signup({settype,toast}) {
    const nameref=useRef();
    const emailref=useRef();
    const pwdref=useRef();
    const cnfpwdref=useRef();
    const contref=useRef();

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
        if(!(nameref.current.value||contref.current.value||emailref.current.value||pwdref.current.value||cnfpwdref.current.value)){
            toasterror("Enter all feilds");
            return false;
        }else if(!validEmail(emailref.current.value)){
            toasterror("not a valid email");
            return false;
        }else if(pwdref.current.value!==cnfpwdref.current.value){
            toasterror("Password not matched");
            return false;
        }else if(contref.current.value.length<10){
          toasterror("Enter valid mobile number");
          return false;
        }else{
            return true;
        }
    }

    async function register(){
        try{
        const res=await axios.post('https://task-manager-zzue.onrender.com/taskmanager/register',{
            name: nameref.current.value,
            email:emailref.current.value,
            contact:contref.current.value,
            password:pwdref.current.value,
        });
        toast.success("Registered successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          settype("login")
       
    }
    catch(e){
        toasterror(e.response.data.message);
    }
    }

  return (
    <>
    <h2>SIGNUP/REGISTER</h2>
    <input type='text' placeholder='Name' ref={nameref} className='signupname'/><br/>
    <input type='text' placeholder='Email' ref={emailref} className='signupemail'/><br/>
    <input type='tel' placeholder='Contact number' ref={contref} className='signupcont'/><br/>
    <input type='password' placeholder='Password' ref={pwdref} className='signuppwd'/><br/>
    <input type='password' placeholder='Confirm Password' ref={cnfpwdref} className='signupcnfpwd'/><br/>
   
    <span className='loginspan' onClick={()=>{settype("login")}}>LOGIN</span>
    <button className='signupbtn' onClick={()=>{
        if(validate()){
            register()
        }
    }}>SIGNUP</button>
    </>
  )
}

export default Signup