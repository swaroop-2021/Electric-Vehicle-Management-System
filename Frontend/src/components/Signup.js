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
  

import {useNavigate } from 'react-router-dom';

function SignUp() {
  let [email,setEmail]=useState('');
  let [address,setAddress]=useState('');
  let [password,setPassword]=useState('');
    
  const navigate=useNavigate();

  const submitDetails=(event)=>{
    event.preventDefault();

    const formData=new FormData();
    
    formData.append('email',email);
    formData.append('address',address);
    formData.append('password',password);
    
    fetch("http://"+process.env.REACT_APP_API_URL +"/signup",
    {
        method:"post",
        body:JSON.stringify({
          email:email,
          address:address,
          password:password
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((r)=>{
      console.log(r);
      return r;
    })
    .then((response)=>{return response.json()})
    .then(res=>{
      console.log(res);
      if(res.status===true){
        alert("SignUp SuccessFull");
        navigate("/login");
      }
      else{
          alert(res["message"]);
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

                  <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Email' id='email' type='email' size="lg" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

                  <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Address' id='address' type='text' size="lg" required value={address} onChange={(e)=>{setAddress(e.target.value)}}/>

                  <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Password' id='password' type='password' size="lg" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

                  <button className="mb-4 px-5 btn btn-primary" id="submit" size='lg' onClick={submitDetails}>SignUp</button>

              </MDBCol>
          </MDBRow>
      </MDBCard>

      </MDBContainer>
  </Form>
  );
}

export default SignUp;
