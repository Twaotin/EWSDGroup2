import React from 'react'
import Sidebar from "../components/utils/departmentsidebar"
export default function Departmentlayout({ children}) {
  return (
    <>
       <div className="pageContainer">
        <Sidebar />
         </div>
    <div className="contentContainer">
        {children}
    </div>
  
    </>
  )
}
