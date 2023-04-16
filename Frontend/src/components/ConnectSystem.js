import React from 'react';
import navigate from 'react';

function ConnectSystem() {

  const deploy_new_system=(event)=>{
    fetch("http://"+process.env.REACT_APP_API_URL +"/deploy_new_system",
    {method:"get"})
    .then(res=>{
      return res;
    })
  }

  const connect_existing_system=(event)=>{
    fetch("http://"+process.env.REACT_APP_API_URL +"/connect_existing_system",
    {method:"get"})
    .then(res=>{
      navigate("/");
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
  