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

function AddEV() {
    const navigate=useNavigate();

    let [address,setAddress]=useState('');
    let [manufacturer,setManufacturer]=useState('');
    let [currentLocation,setCurrentLocation]=useState('');
    let [vehicleType,setVehicleType]=useState('');
    let [ownerName,setOwnerName]=useState('');
    let [licensePlate,setLicensePlate]=useState('');
    let [energyCapacity,setEnergyCapacity]=useState('');


    const submitDetails=(event)=>{
        event.preventDefault();

        const formData=new FormData();
        
        formData.append('address',address);
        formData.append('manufacturer',manufacturer);
        formData.append('currentLocation',currentLocation);
        formData.append('vehicleType',vehicleType);
        formData.append('ownerName',ownerName);
        formData.append('licensePlate',licensePlate);
        formData.append('energyCapacity',energyCapacity);

        fetch("http://"+process.env.REACT_APP_API_URL +"/addEV",
        {
            method:"POST",
            body:JSON.stringify({address:address,
                manufacturer:manufacturer,
                currentLocation:currentLocation,
                vehicleType:vehicleType,
                ownerName:ownerName,
                licensePlate:licensePlate,
                energyCapacity:energyCapacity}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(res=>{
            alert("EV Added Successfully");
            navigate("/addEV");
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

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Manufacturer' id='manufacturer' type='text' size="lg" required value={manufacturer} onChange={(e)=>{setManufacturer(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Current Location' id='currentLocation' type='text' size="lg" required value={currentLocation} onChange={(e)=>{setCurrentLocation(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Vehicle Type' id='vehicle_type' type='text' size="lg" required value={vehicleType} onChange={(e)=>{setVehicleType(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Owner Name' id='owner_name' type='text' size="lg" required value={ownerName} onChange={(e)=>{setOwnerName(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='License Plate' id='licence_plate' type='text' size="lg" required value={licensePlate} onChange={(e)=>{setLicensePlate(e.target.value)}}/>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Energy Capacity' id='energyCapacity' type='text' size="lg" required value={energyCapacity} onChange={(e)=>{setEnergyCapacity(e.target.value)}}/>

                        <button className="mb-4 px-5 btn btn-primary" id="submit" size='lg' onClick={submitDetails}>Create EV</button>

                    </MDBCol>
                </MDBRow>
            </MDBCard>

            </MDBContainer>
        </Form>
      );
    
}

export default AddEV;