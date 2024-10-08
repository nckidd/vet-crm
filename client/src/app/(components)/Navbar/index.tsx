"use client"; //use in next anytime you have a component with an event handler
              //bc you cant pass onclick to any server component in nextjs

import React from 'react'
import { Bell, Link, Menu, Moon, Settings, Sun } from "lucide-react"
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';
type Props = {}

const Navbar = () => {
  /* add state */
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
      (state) => state.global.isSidebarCollapsed
  );
  
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  /* toggle sidebar to invert isSidebarCollapsed */
  const toggleSidebar = () => {
      dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  
  /* toggle dark mode to invert isDarkMode */
  const toggleDarkMode = () => (
    dispatch(setIsDarkMode(!isDarkMode))
  );

  return (
    <div className="flex justify-between items-center w-full mb-7">
    {/* LEFT SIDE */}
    <div className="flex justify-between items-center gap-5">
      <button 
        className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue" 
        onClick={toggleSidebar}
      >
        <Menu className="w-4 h-4"/>
      </button>
    
    <div className='relative'>
      <input 
        type="search" 
        placeholder="Start type to search groups & products" 
        className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-whie rounded-lg focus:outline-none focus:border-blue-500" />
      {/* bell */}
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <Bell className="text-gray-500" size={20} />
      </div>
    </div>
    </div>
    
    {/* RIGHT SIDE */}

    <div className='flex justify-between items-center gap-5'>
      
      {/*hidden is default value and will be flex on larger screens*/}
      <div className='hidden md:flex justify-between items-center gap-5'>
        <div>
          <button onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Sun className="cursor-pointer text-gray-500" size={24} />
            ) : (
              <Moon className="cursor-pointer text-gray-500" size={24} />
            )}
          </button>
        </div>
        <div className='relative'>
          <Bell className='cursor-pointer text-gray-500' size={24} />
          <span className='absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full'>
            3
          </span> 
        </div>
        <hr className='w-0 h-7 border border-solid border-l border-gray-300 mx-3' /> {/* vertical line */} 
        <div className='flex items-center gap-3 cursor-pointer'>
          <div className='w-9 h-9'>
            image  
          </div>
          <span className='font-semibold'>Christene Kidd</span>  
        </div> 
      </div> 

      {/* settings button, outside of hidden div to be visible when width is small; omitted link because it added a link icon */}
      {/* <Link href="/settings"> */}
      <Settings href="/settings" className="cursor-pointer text-gray-500" size={24}/>
      {/* </Link> */}
    </div>
    </div>
  )
}

export default Navbar