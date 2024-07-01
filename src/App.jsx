import React from 'react'
import './App.css'
import Home from './Components/Home/Home.jsx'
import Twoplayer from './Components/Twoplayer/Twoplayer.jsx'
import Header from './Components/header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';



function App(){
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
            
        </>
    )
}

export default App;
