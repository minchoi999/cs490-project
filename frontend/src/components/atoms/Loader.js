/*----------------------
    LOADER COMPONENT:
    display a gif of a wheel when pages are loading slowly
------------------------*/

import React from 'react';
import loader from "../../images/loader.gif";


const Loader = () => (
  <div className="text-center">
    <img className="loader" src={loader} alt="Loading..."/>
    <p></p>
    <p></p>
  </div>
 );

 export default Loader