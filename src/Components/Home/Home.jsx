import React from "react";
import { NavLink } from "react-router-dom";
import pic1 from "../Assets/pic1.png"
import pic2 from "../Assets/pic2.png"  

function Home() {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-[10vw] align-middle h-[80vh] items-center">

      
      <NavLink to="/Pass-N-Play" >
        <button className="bg-black text-black h-40 w-40 rounded-xl ">
          <img
            src={pic1}
            className="mr-3 h-40 w-40 rounded-3xl"
            alt="Logo"
          />
          <span className="text-blue-400 text-lg font-serif font-bold">Pass N Play</span>
        </button>
        
        </NavLink>

        <NavLink to="/Computer" >
        <button className="bg-black text-black h-40 w-40 rounded-xl ">
          <img
            src={pic2}
            className="mr-3 h-40 w-40 rounded-3xl"
            alt="Logo"
          />
          <span className="text-blue-400 text-lg font-serif font-bold">vs Computer</span>
        </button>
        
        </NavLink>

      </div>
     
           
      </>
      );
}

      export default Home;
