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

function ChargeEV() {

    let [subAddress,setSubAddress]=useState('');
    let [objAddress,setObjAddress]=useState('');
    let [action,setAction]=useState('');
    
    const submitDetails=(event)=>{
        event.preventDefault();

        fetch("http://"+process.env.REACT_APP_API_URL +"/chargeEV",
        {
            method:"post",
            body:JSON.stringify({
                subAddress:subAddress,
                objAddress:objAddress,
                action:action,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(r=>{return r.json()})
        .then(res=>{
            alert(res.message);
            if(res.message.indexOf("SUCCESS")!==-1){
                window.location.href="/home";
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

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Subject Address' id='subAddress' type='text' size="lg" required value={subAddress} onChange={(e)=>{setSubAddress(e.target.value)}}/>
                        
                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Object Address' id='objAddress' type='text' size="lg" required value={objAddress} onChange={(e)=>{setObjAddress(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Action' id='action' type='text' size="lg" required value={action} onChange={(e)=>{setAction(e.target.value)}}/>

                        <button className="mb-4 px-5 btn btn-primary" id="submit" size='lg' onClick={submitDetails}>Get Access Control</button>

                    </MDBCol>
                </MDBRow>
            </MDBCard>

            </MDBContainer>
        </Form>
      );
    
}

export default ChargeEV;