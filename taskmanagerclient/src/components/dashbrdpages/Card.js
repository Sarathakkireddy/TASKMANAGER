import React, { useRef, useState } from "react";
import "../../styles/card.css";
import Draggable, { DraggableCore } from "react-draggable";
import axios from "axios";
import Modal from "react-modal";
import AWS from "aws-sdk";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background:'#D0A2F7',
    borderRadius:'50px',
  },
};


function Card({ card, load, setload, navigate,toasterror,toastsuccess }) {
  const [file, setFile] = useState("");
  const [edit, setEdit] = useState(false);
  const titleeditref = useRef();
  const desceditref = useRef();
  const fileeditref = useRef();
  const [modalIsOpen, setIsOpen] = useState(false);

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
  
    });
  };


  async function udt(){
    try {
    const resp = await axios({
      method: "patch",
      url: "https://task-manager-zzue.onrender.com/taskcard/update",
      headers: { Authorization: localStorage.token },
      data: {
        id: card._id,
        card,
      },
    })
    if(resp.status===200){
    setload(!load);
    }

    } catch (e) {
      if (e.response.status === 401) {
        toasterror("Session Expired Re-Login");
        localStorage.clear();
        navigate("/");
      }
      console.log(e);
    }
  }

  const eventHandler = async (e, data) => {
    if (inprogressele.left <= e.x && e.x <= inprogressele.right) {
      card.categ = "inprogress";
      udt();
    } else if (todoele.left <= e.x && e.x <= todoele.right) {
      card.categ = "todo";
      udt();
    } else if (completedele.left <= e.x && e.x <= completedele.right) {
      card.categ = "completed";
      udt();
    }
    
  };

  const inprogressele = document
    .getElementById("inprogressid")
    .getBoundingClientRect();
  const todoele = document.getElementById("todoid").getBoundingClientRect();
  const completedele = document
    .getElementById("completedid")
    .getBoundingClientRect();
  const linkurl = `https://sarathtest-2.s3.ap-south-1.amazonaws.com/${card.file}`;

  async function deletecard() {
    try {
      const res = await axios({
        method: "delete",
        url: `https://task-manager-zzue.onrender.com/taskcard/del${card._id}`,
        headers: { Authorization: localStorage.token },
      });
      if(res.status===200){
        toasterror(`Deleted Card with Title ${card.title}`);
      setload(!load);
      }
    } catch (e) {
      toasterror(e);
      console.log(e);
    }
  }

  async function editcard() {
    if(file!==""){
    uploadFile();
    card.file=file.name;
    console.log(card);
    }

    try {
      const resp = await axios({
        method: "patch",
        url: "https://task-manager-zzue.onrender.com/taskcard/update",
        headers: { Authorization: localStorage.token },
        data: {
          id: card._id,
          card,
        },
      });
      if(resp.status===200){
        toastsuccess("Successfully Edited");
      setload(!load);
      setIsOpen(false);
      }
    } catch (e) {
      if (e.response.status === 401) {
        toasterror(e);
        localStorage.clear();
        navigate("/");
      }
      console.log(e);
    }
  }
  function openModal() {
    setEdit(true);
    setIsOpen(true);
    
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [title,settitle]=useState(card.title);
  const [desc,setdesc]=useState(card.desc);
  const modelref=useRef();
  return (
    <>
    <Draggable onStop={eventHandler}>
      <div className="cardcont">
        <div className="cardtitle">
          <label>Title : </label>
          {card.title}
        </div>
        <div className="carddesc">
          <label>Description : </label>
          {card.desc}
        </div>
        <div className="cardfile">
          <label>Attachment : </label>
          {card.file !== "" ? (
            <a href={linkurl} target="blank">
              {card.file}
            </a>
          ) : (
            card.file
          )}
        </div>
        <span
          className="editicn"
          onClick={() => {

            openModal();
          }}
        >
          <i class="fa-solid fa-pen"></i>
        </span>
        <span
          className="trashicn"
          onClick={() => {
            deletecard();
          }}
        >
          <i class="fa-solid fa-trash"></i>
        </span>
        
      </div>
    </Draggable>

    <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <div className="modelcont" ref={modelref}>
            <input
              type="text"
              ref={titleeditref}
              className="titleedit"
              value={title}
              onChange={(e)=>{settitle(e.target.value)}}
            />
            <br />
            <input
              type="text"
              ref={desceditref}
              className="descedit"
              value={desc}
              onChange={(e)=>{setdesc(e.target.value)}}
            />
            <br />
            <input
              type="file"
              ref={fileeditref}
              className="fileuploadedit"
              onChange={(e) => {
                const file = e.target.files[0];
                setFile(file);
              }}
            />
            <br />
            <button
            className="editcardbtn"
              onClick={() => {
                card.title=titleeditref.current.value;
                card.desc=desceditref.current.value;
                editcard();
              }}
            >
              Edit Task
            </button>
          </div>
        </Modal>
    </>
  );
}

export default Card;
