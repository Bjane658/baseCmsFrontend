import React, { useEffect } from 'react'
import { isBearerToken } from "../utils/token";


const Home = () => {

   useEffect(() => {
      const bearer = localStorage.getItem("token");
      if(isBearerToken(bearer)){
         location.pathname = "/dashboard";
      }else{
         location.pathname = "/login";
      }
   });

   return (

<div>


</div>
)};

export default Home
