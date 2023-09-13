import React from 'react';
import "./app.css" ;
import Hero from "./Components/Hero.jsx";
import Demo from "./Components/Demo.jsx";


const App = () => {
  return (
   <main>
    <div className='main'>
      <div className='gradient'/>
    </div>
    <div className='app'>
    <Hero/>
    <Demo/> 

    </div>
   </main>
  )
}

export default App;