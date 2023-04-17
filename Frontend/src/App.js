import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

import NavigationBar from './components/Navbar'; 
import Login from './components/Login';
import SignUp from './components/Signup';
import Home from './components/Home';
import Logout from './components/Logout';
import ChargeEV from './components/ChargeEV';
import ConnectSystem from './components/ConnectSystem';
import AddEV from './components/AddEV';
import AddCS from './components/AddCS';
import AddPolicy from './components/AddPolicy';
function App() {
  
  return (
    
    <Router>
      
      <NavigationBar></NavigationBar>

      <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/home' element={<Home/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/logout' element={<Logout />}></Route>
          <Route exact path='/signup' element={<SignUp/>}></Route>
          <Route exact path='/addEV' element={<AddEV/>}></Route>
          <Route exact path='/addCS' element={<AddCS/>}></Route>
          <Route exact path='/addPolicy' element={<AddPolicy/>}></Route>
          <Route exact path='/chargeEV' element={<ChargeEV/>}></Route>
          <Route exact path='/connectSystem' element={<ConnectSystem/>}></Route>
      </Routes>

    </Router>


  );
}

export default App;
