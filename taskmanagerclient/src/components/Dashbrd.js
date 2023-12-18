import React, { useEffect } from "react";
import "../styles/dashbrd.css";
import Tasks from "./dashbrdpages/Tasks";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashbrd() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
    <div className="dash-cont">
      <div className="task-cont">
        <Tasks navigate={navigate} toast={toast} />
      </div>
    </div>
    <ToastContainer/>
    </>
    
  );
}

export default Dashbrd;
