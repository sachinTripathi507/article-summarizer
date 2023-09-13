import React from 'react'
import{logo} from '../assets'
// import{github} from '../assets'

const Hero = () => {
  return (
    <header className="w-full  justify-center items-center mb-10 pt-3">
       <nav className='flex justify-between  flex_col'>
        <img src={logo} alt='404😁' className='w-28  object-contain'/>
        <button type='button'
         onClick={()=> window.open('https://github.com/sachinTripathi507',"_blank")}
          className='black_btn '>github</button>
      </nav>
      <h1 className='head_text'>summarize articles with<br className='max-md:hidden'/>
      <span className='orange_gradient'>OpenAI GPT-4</span></h1>
      <h2 className='desc items-center ml-[28%] mr-[20%]'>  Simplify your reading with Summize,an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries </h2>
    </header>
  )
}

export default Hero