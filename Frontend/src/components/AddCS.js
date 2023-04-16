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



function AddCS() {

    let [address,setAddress]=useState('');
    let [plugType,setPlugType]=useState('');
    let [location,setLocation]=useState('');
    let [pricingModel,setPricingModel]=useState('');
    let [numChargingOutlets,setNumChargingOutlets]=useState('');
    let [chargingPower,setChargingPower]=useState('');
    let [fastCharging,setFastCharging]=useState('');


    const submitDetails=(event)=>{
        event.preventDefault();

        fetch("http://"+process.env.REACT_APP_API_URL +"/addCS",
        {
            method:"post",
            body:JSON.stringify({
                address:address,
                plugType:plugType,
                location:location,
                pricingModel:pricingModel,
                numChargingOutlets:numChargingOutlets,
                chargingPower:chargingPower,
                fastCharging:fastCharging
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response=>{return response.json()})
        .then(res=>{
            if(res.message.indexOf("SUCCESS")!==-1)
            {
                alert(`CS ${plugType} Added Successfully`);
                window.location.href="/home";
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

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Address' id='address' type='text' size="lg" required value={address} onChange={(e)=>{setAddress(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Plug Type' id='plugType' type='text' size="lg" required value={plugType} onChange={(e)=>{setPlugType(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Location' id='location' type='text' size="lg" required value={location} onChange={(e)=>{setLocation(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Pricing Model' id='pricingModel' type='text' size="lg" required value={pricingModel} onChange={(e)=>{setPricingModel(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Charging Outlets' id='numChargingOutlets' type='text' size="lg" required value={numChargingOutlets} onChange={(e)=>{setNumChargingOutlets(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Charging Power' id='chargingPower' type='text' size="lg" required value={chargingPower} onChange={(e)=>{setChargingPower(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Fast Charging' id='fastCharging' type='text' size="lg" required value={fastCharging} onChange={(e)=>{setFastCharging(e.target.value)}}/>

                        <button className="mb-4 px-5 btn btn-primary" id="submit" size='lg' onClick={submitDetails}>Create CS</button>

                    </MDBCol>
                </MDBRow>
            </MDBCard>

            </MDBContainer>
        </Form>
      );
    
}

export default AddCS;