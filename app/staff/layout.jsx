import React from 'react'
import NavbarComponent  from "../components/utils/staffnavigationbar"

export default function Stafflayout({ children }) {
  return (
    <>
      <div  >
        <NavbarComponent />
        </div>
   <div >
    {children}
      </div>
      
    </>
  )
}
