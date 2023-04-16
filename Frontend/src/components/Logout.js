import { useEffect } from 'react';

function Logout () {

  useEffect(()=>{
        localStorage.removeItem("token");
        window.location.href = "/home";
  })
}
export default Logout;
