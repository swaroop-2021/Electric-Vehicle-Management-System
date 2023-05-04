// import React, { useState } from 'react';
// import { Form } from 'react-bootstrap';
// import {
//     MDBContainer,
//     MDBCard,
//     MDBCardBody,
//     MDBRow,
//     MDBCol,
//     MDBInput
//   }
//   from 'mdb-react-ui-kit';
// function Login() {
//   let [email,setEmail]=useState('');
//   let [password,setPassword]=useState('');
  

//   const submitDetails=(event)=>{
//     event.preventDefault();

//     const formData=new FormData();
    
//     formData.append('email',email);
//     formData.append('password',password);
    
//     fetch("http://"+process.env.REACT_APP_API_URL +"/login",
//     {
//         method:"post",
//         body:JSON.stringify({
//           email:email,
//           password:password
//         }),
//         headers: {
//           'Content-type': 'application/json; charset=UTF-8',
//         }
//     })
//     .then((response)=>{return response.json()})
//     .then(res=>{
//       console.log(res);
//       if(res.status===true){
//         alert("Login SuccessFull");
//         localStorage.setItem("token",JSON.stringify(res));
//         window.location.href="/connectSystem";
//       }
//       else{
//           alert(res.message);
//       }
//     })
// }

//   return (
//     <Form>
//       <MDBContainer className="my-5">

//       <MDBCard alignment='center'>

//           <MDBRow className='align-items-center justify-content-center g-0'>

//               <MDBCol md='6'>
//                   <MDBCardBody className=' d-flex flex-column'></MDBCardBody>

//                   <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Email' id='email' type='email' size="lg" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

//                   <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Password' id='password' type='password' size="lg" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

//                   <button className="mb-4 px-5 btn btn-primary" id="submit" size='lg' onClick={submitDetails}>Login</button>

//               </MDBCol>
//           </MDBRow>
//       </MDBCard>

//       </MDBContainer>
//   </Form>
//   );
// }

// export default Login;

// ------------------------------------------------------------------------------- //


import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
function Login() {
  let [email,setEmail]=useState('');
  let [password,setPassword]=useState('');
  

  const submitDetails=(event)=>{
    event.preventDefault();

    const formData=new FormData();
    
    formData.append('email',email);
    formData.append('password',password);
    
    fetch("http://"+process.env.REACT_APP_API_URL +"/login",
    {
        method:"post",
        body:JSON.stringify({
          email:email,
          password:password
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response)=>{return response.json()})
    .then(res=>{
      console.log(res);
      if(res.status===true){
        alert("Login SuccessFull");
        localStorage.setItem("token",JSON.stringify(res));
        window.location.href="/connectSystem";
      }
      else{
          alert(res.message);
      }
    })
}

  return (
    <Form>
      <MDBContainer className="my-5">

      <MDBCard alignment='center'>

          <MDBRow className='align-items-center justify-content-center g-0'>

              <MDBCol md='6'>
                  <MDBCardBody className=' d-flex flex-column'></MDBCardBody>

                  
                  <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Email' id='email' type='email' size="lg" required value={email} onChange={(e)=>{setEmail(e.target.value)}} style={{border: "2px solid #007bff", transition: "all 0.3s ease-in-out"}}/>

                  
                  <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Password' id='password' type='password' size="lg" required value={password} onChange={(e)=>{setPassword(e.target.value)}} style={{border: "2px solid #007bff", transition: "all 0.3s ease-in-out"}}/>

                  
                  <button className="mb-4 px-5 btn btn-primary" id="submit" size='lg' onClick={submitDetails} style={{boxShadow: "0 4px 8px rgba(0,0,0,0.2)", transform: "scale(1)", transition: "all 0.3s ease-in-out"}}>Login</button>

                  
                  <style jsx>{`
                    #email:focus,
                    #password:focus {
                      border-color: #0062cc;
                      outline: none;
                      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(38,143,255,.6);
                    }

                    #submit:hover {
                      transform: scale(1.05);
                      box-shadow: 0 6px 12px rgba(0,0,0,0.4);
                    }
                  `}</style>
              </MDBCol>
          </MDBRow>
      </MDBCard>
      </MDBContainer>
    </Form>
  )
}

export default Login;
