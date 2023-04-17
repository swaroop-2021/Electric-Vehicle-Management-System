import React, { useEffect } from 'react';

function Home() {
  
  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("connectSystem"))!==true){
      window.location.href="/connectSystem";
    }
  })

  return (
      <div>
        <p>Home</p>
      </div>
    );
  }
  
  export default Home;
  