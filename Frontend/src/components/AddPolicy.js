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

function AddPolicy() {

    let [subAddress,setSubAddress]=useState('');
    let [objAddress,setObjAddress]=useState('');
    let [read]=useState('');
    let [write]=useState('');
    let [execute]=useState('');
    // let [read,setRead]=useState('');
    // let [write,setWrite]=useState('');
    // let [execute,setExecute]=useState('');
    let [minInterval,setMinInterval]=useState('');
    let [startTime,setStartTime]=useState('');
    let [endTime,setEndTime]=useState('');

    const submitDetails=(event)=>{
        event.preventDefault();

        read=true;
        write=false;
        execute=false;

        fetch("http://"+process.env.REACT_APP_API_URL +"/addPolicy",
        {
            method:"post",
            body:JSON.stringify({
                subAddress:subAddress,
                objAddress:objAddress,
                read:read,
                write:write,
                execute:execute,
                minInterval:minInterval,
                startTime:startTime,
                endTime:endTime
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then((response)=>{return response.json()})
        .then(res=>{
            if(res.message.indexOf("SUCCESS")!==-1){
                alert("Policy Added Successfully");
                window.location.href="/addPolicy";
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

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Subject Address' id='subAddress' type='text' size="lg" required value={subAddress} onChange={(e)=>{setSubAddress(e.target.value)}}/>
                        
                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Object Address' id='objAddress' type='text' size="lg" required value={objAddress} onChange={(e)=>{setObjAddress(e.target.value)}}/>

                        {/* <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Read' id='read' type='text' size="lg" required value={read} onChange={(e)=>{setRead(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Write' id='write' type='text' size="lg" required value={write} onChange={(e)=>{setWrite(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Execute' id='Execute' type='text' size="lg" required value={execute} onChange={(e)=>{setExecute(e.target.value)}}/> */}

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Minimum Interval' id='minInterval' type='text' size="lg" required value={minInterval} onChange={(e)=>{setMinInterval(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Start Time' id='startTime' type='text' size="lg" required value={startTime} onChange={(e)=>{setStartTime(e.target.value)}}/>
                        
                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='End Time' id='endTime' type='text' size="lg" required value={endTime} onChange={(e)=>{setEndTime(e.target.value)}}/>

                        <button className="mb-4 px-5 btn btn-primary" id="submit" size='lg' onClick={submitDetails}>Create Policy</button>

                    </MDBCol>
                </MDBRow>
            </MDBCard>

            </MDBContainer>
        </Form>
      );
    
}

export default AddPolicy;