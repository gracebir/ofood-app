import React from 'react'
import { 
    ShoppingCartIcon
} from '@heroicons/react/outline';

function navbar() {
    return (
        <header className="sticky top-0 z-50">
            <div className="flex justify-between items-center bg-ofood_dark-light p-1 px-10 flex-grow py-2">
               <div className="mt-2 flex flex-grow sm:flex-grow-0">
                    <h3 className='text-white font-extrabold text-3xl'>oFood.</h3>
               </div>

              
               {/* right section icons */}
               <div className="text-white flex justify-end items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                   <div className="link">
                       <p>Sign In</p>
                       <p className="font-extrabold md:text-sm ">Account & Lists</p>
                   </div>
                  
                   <div className="relative link flex items-center">
                       <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">0</span>
                       <ShoppingCartIcon className="h-10"/>
                       <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
                   </div>
               </div>
           </div>
        </header>
    )
}

export default navbar
