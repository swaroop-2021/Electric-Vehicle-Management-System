import React, { useState } from 'react';
import { useEffect } from 'react';

function Home() {
  const [count, setCount] = useState(0);

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("connectSystem"))!==true){
      window.location.href="/connectSystem";
    }
  })

  const handleClick = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Home</p>
      <button onClick={handleClick} className="btn">About Us</button>
      <p>You clicked the button {count} times</p>
    </div>
  );
}

export default Home