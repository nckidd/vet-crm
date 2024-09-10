//so we can provide the store to our dashboard layout
"use client";

import React, { useEffect } from 'react'
import Navbar from "@/app/(components)/Navbar" /* put components in paren bc it should not be a url route*/
import Sidebar from '@/app/(components)/Sidebar' /* @/app = absolute path so it doesn't change */
import StoreProvider, { useAppSelector } from './redux'

/* DashboardLayout
    - connects nextjs app with redux
    - separates wrapper into two components because DashboardLayout requires a redux state
      - this means DashboardLayout must be wrapped inside StoreProvider instead of the other way around
 */
const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  /* useEffect(..)
      - allows us to control the html and body elements via the dark/light mode
      - adds dark/light mode onto the html element without directly adding it to layout.tsx 
          - s.t. layout.tsx can refrain from becoming a client component which can't happen in next.js 
   */
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.add('light');
    }
  });

  return (
    <div 
      className={` ${ 
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}> {/* create flex box to orient sidebar and main components */}
      
      <Sidebar/ >
      <main className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${isSidebarCollapsed ? "md:pl-24" : "md:pl-72"}`}> {/* md is a media breakpoint at medium to set padding left i.e., sidebar width */}
        <Navbar />
        {children}
        </main>
        {children}</div>
  )
}

/* DashboardWrapper
    - wraps our entire website with redux via StoreProvider
      - this means our redux store provides the same state for all the pages 
        which persists and saves across all pages
 */
const DashboardWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper