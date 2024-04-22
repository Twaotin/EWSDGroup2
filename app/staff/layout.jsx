import React from 'react'
//import Navbarstaff from "../components/utils/staffnavbar"
import Navbarstaff from "../components/sidebar"
export default function Stafflayout({ children }) {
  return (
   <>
   <Navbarstaff />
   <div>
    {children}
   </div>
    </>
  )
}
