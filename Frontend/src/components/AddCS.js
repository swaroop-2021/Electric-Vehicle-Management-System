import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';


import {useNavigate } from 'react-router-dom';

function AddCS() {
    const navigate=useNavigate();

    let [address,setAddress]=useState('');
    let [plugType,setPlugType]=useState('');
    let [location,setLocation]=useState('');
    let [pricingModel,setPricingModel]=useState('');
    let [numChargingOutlets,setNumChargingOutlets]=useState('');
    let [chargingPower,setChargingPower]=useState('');
    let [fastCharging,setFastCharging]=useState('');


    const submitDetails=(event)=>{
        event.preventDefault();

        const formData=new FormData();
        
        formData.append('address',address);
        formData.append('plugType',plugType);
        formData.append('location',location);
        formData.append('pricingModel',pricingModel);
        formData.append('numChargingOutlets',numChargingOutlets);
        formData.append('chargingPower',chargingPower);
        formData.append('fastCharging',fastCharging);

        fetch("http://"+process.env.REACT_APP_API_URL +"/addCS",
        {
            method:"post",
            body:formData
        })
        .then(res=>{
            alert("CS Added Successfully");
            navigate("/addCS");
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

                        <button className="mb-4 px-5 btn btn-primary" id="submit" size='lg' onClick={submitDetails}>Create EV</button>

                    </MDBCol>
                </MDBRow>
            </MDBCard>

            </MDBContainer>
        </Form>
      );
    
}

export default AddCS;