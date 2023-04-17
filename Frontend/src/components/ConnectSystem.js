import React from 'react';
import { useEffect } from 'react';

function ConnectSystem() {

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("connectSystem"))===true){
      window.location.href="/home";
    }
  })

  const deploy_new_system=(event)=>{
    fetch("http://"+process.env.REACT_APP_API_URL +"/deploy_new_system",
    {method:"get"})
    .then(res=>{
      localStorage.setItem("connectSystem",true);
      window.location.href="/home";
    })
  }

  const connect_existing_system=(event)=>{
    fetch("http://"+process.env.REACT_APP_API_URL +"/connect_existing_system",
    {method:"get"})
    .then(res=>{
      localStorage.setItem("connectSystem",true);
      window.location.href="/home";
    })
  }

  return (
      <div className="text-center">
        <p>Select System</p>
        <br />
        <button className="btn btn-primary" onClick={deploy_new_system}>Deploy New System</button>
        <br /><br />
        <button className="btn btn-primary" onClick={connect_existing_system}>Connect Existing System</button>
      </div>
    );
  }
  
  export default ConnectSystem;
  