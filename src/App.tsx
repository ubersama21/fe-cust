import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navigate, Route } from 'react-router-dom';
import HomeP from './Home/HomeP';
import { Routes } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import DItem from './DetailItems/DItem';
import ScrollToTop from './Cont/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import Carts from './Cart/Carts';
import PageSearch from './PageSearch/PageSearch';
import About from './About/About';
import NotfoundPage from './Cont/NotfoundPage';


function App() {

  
  return (
    <div className="App">
      <ScrollToTop/>
      <NavBar/>
     <Routes>
     <Route path="/" element={<Navigate to="/home" replace />} />
     <Route path='/home' element={<HomeP/>}/>
      <Route path='/items/de/:d' element={<DItem/>}/>
      <Route path='/cart' element={<Carts/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/search/:itx' element={<PageSearch/>}/>
      <Route path='*' element={<NotfoundPage/>}/>
     </Routes>
     <ToastContainer/>
    </div>
  );
}

export default App;
