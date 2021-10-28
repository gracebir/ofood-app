import React from 'react'
import Hero from '../asset/burger.png';

function Banner() {
    return (
        <div className="flex justify-between ">
           <div className='my-auto'>
               <div className='px-10'>
                   <h1 className='font-bold text-white text-4xl'>Delicious Delider on time</h1>
                   <span className='link font-extrabold text-white'>Order food now </span>
                  <div>
                  <button className='bg-red-700 text-white p-2'>make order</button>
                  </div>
               </div>
               
           </div>
           <div>
               <img className='max-h-screen' src={Hero} alt="hero" />
           </div>
        </div>
    )
}

export default Banner
