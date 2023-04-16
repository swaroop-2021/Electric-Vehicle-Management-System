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


import {useNavigate} from 'react-router-dom';

function AccessControl() {
    const navigate=useNavigate();

    let [subAddress,setSubAddress]=useState('');
    let [objAddress,setObjAddress]=useState('');
    let [action,setAction]=useState('');
    let [location,setLocation]=useState('');
    
    const submitDetails=(event)=>{
        event.preventDefault();

        const formData=new FormData();
        
        formData.append('subaddress',subAddress);
        formData.append('objaddress',objAddress);
        formData.append('action',action);
        formData.append('location',location);

        fetch("http://"+process.env.REACT_APP_API_URL +"/accessControl",
        {
            method:"post",
            body:formData
        })
        .then(res=>{
            alert("Access Control Added Successfully");
            navigate("/accessControl");
        })
    }
        
      return (
        <Form>
            <MDBContainer className="my-5">

            <MDBCard alignment='center'>

                <MDBRow className='align-items-center justify-content-center g-0'>

                    <MDBCol md='6'>
                        <MDBCardBody className=' d-flex flex-column'></MDBCardBody>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Subject Address' id='subAddress' type='text' size="lg" required value={objAddress} onChange={(e)=>{setSubAddress(e.target.value)}}/>
                        
                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Object Address' id='objAddress' type='text' size="lg" required value={subAddress} onChange={(e)=>{setObjAddress(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Action' id='action' type='text' size="lg" required value={action} onChange={(e)=>{setAction(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Location' id='location' type='text' size="lg" required value={location} onChange={(e)=>{setLocation(e.target.value)}}/>

                        <button className="mb-4 px-5 btn btn-primary" id="submit" size='lg' onClick={submitDetails}>Get Access Control</button>

                    </MDBCol>
                </MDBRow>
            </MDBCard>

            </MDBContainer>
        </Form>
      );
    
}

export default AccessControl;