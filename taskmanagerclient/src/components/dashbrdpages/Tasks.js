import React, { useEffect, useRef, useState } from 'react'
import '../../styles/tasks.css'
import Modal from 'react-modal';
import AWS from 'aws-sdk';
import axios from 'axios';
import Card from './Card';
import Draggable, {DraggableCore} from "react-draggable";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: '50%',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background:'#D0A2F7',
      borderRadius:'50px',
    },
  };

function Tasks({navigate,toast}) {
  const [edit,setedit]=useState(false);
   const [file,setfile]=useState("");
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const fileref=useRef();
    const titleref=useRef();
    const descref=useRef();
    const [cards,setCards]=useState();
    const [load,setload]=useState(1);

    useEffect(()=>{
      async function fetchdata(){
        try{
          const res=await axios({
            method:"get",
            url:`http://localhost:4000/taskcard/allcrds${localStorage.id}`,
            headers: { Authorization: localStorage.token },
          });
          if(res.status===200){
          setCards([...res.data.cards]);
          }
        }catch(e){
          if(e.response.status===401){
            toasterror("Session expired Re-Login");
            localStorage.clear();
            navigate("/");
          }
          toasterror(e);
          console.log(e);
        }
      }
      fetchdata();
      
    },[load])

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
  function toastsuccess(msg){
    toast.success(msg, {
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
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    

    const uploadFile = async () => {
        const S3_BUCKET = process.env.REACT_APP_BUCKETNAME;
        const REGION = process.env.REACT_APP_REGION;
    
        AWS.config.update({
          accessKeyId: process.env.REACT_APP_ACCESSKEY,
          secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
        });
        const s3 = new AWS.S3({
          params: { Bucket: S3_BUCKET },
          region: REGION,
        });
    
        const params = {
          Bucket: S3_BUCKET,
          Key: file.name,
          Body: file,
        };
    
        var upload = s3
          .putObject(params)
          .on("httpUploadProgress", (evt) => {
            console.log(
              "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
            );
          })
          .promise();
    
        await upload.then((err, data) => {
          console.log(err);
          setfile("");
        });
      };

      async function createnewcard(){
        try{
        if(file!==""){
          uploadFile();
        }
        const resp =await axios({method: "post",url:"http://localhost:4000/taskcard/crtcard",
          data:{
          userid:localStorage.id,
          title: titleref.current.value,
          desc:descref.current.value,
          file:file!==""?file.name:"",
          },
          headers: { Authorization: localStorage.token }
        });
        if(resp.status===200){
          toastsuccess(`New card created with title ${titleref.current.value}`);
        setload(!load);
        console.log(resp);
        }
      }catch(e){
        if(e.response.status===401){
          toasterror("Session expired Re-Login");
          localStorage.clear();
          navigate("/");
        }
        toasterror(e);
        console.log(e);
      }
      }
      
  return (
    <>
    <div className='btncont'><button onClick={openModal} className='addnewcardbtn'>Add new Task</button>
    <button className='logoutbtn' onClick={()=>{localStorage.clear();navigate("/")}}>LOGOUT</button>
    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        
      >
        
        <div className='modelcont'>
            <input type='text' ref={titleref} className='title' placeholder='Title' /><br/>
            <input type='text' ref={descref} className='desc' placeholder='desc'/><br/>
            <input type='file' ref={fileref} className='fileupload' onChange={(e)=>{const file = e.target.files[0];
    setfile(file);}}/><br/>
            <button 
            className='createcardbtn'
            onClick={()=>{
                createnewcard();
                setload(!load);
                setIsOpen(false);
            }}
                >Create Task</button>
        </div>
        
       
      </Modal>
    </div>
    <div className='container'>
        <div className='todo' id='todoid'>
            <div className='todohead'>TODO</div>
            {cards?cards.map((card,index)=>{if(card.categ==="todo"){ 
              return(<Card card={card} key={index} toasterror={toasterror} toastsuccess={toastsuccess} edit={edit} setedit={setedit} navigate={navigate} load={load} setload={setload} Draggable={Draggable}/>)
              }else{
                return "";
              }}):""}
        </div>
        <div className='inprogress' id='inprogressid'>
            <div className='inproghead'>IN PROGRESS</div>
            {cards?cards.map((card,index)=>{if(card.categ==="inprogress"){ 
              return(<Card card={card} key={index} toasterror={toasterror} toastsuccess={toastsuccess} navigate={navigate} load={load} setload={setload} Draggable={Draggable}/>)
              }else{
                return "";
              }}):""}
        </div>
        <div className='completed' id='completedid'>
            <div className='completedhead'>COMPLETED</div>
            {cards?cards.map((card,index)=>{if(card.categ==="completed"){ 
              return(<Card card={card} key={index} toasterror={toasterror} toastsuccess={toastsuccess} navigate={navigate} load={load} setload={setload} Draggable={Draggable}/>)
              }else{
                return "";
              }}):""}
        </div>
    </div>
    </>
  )
}

export default Tasks