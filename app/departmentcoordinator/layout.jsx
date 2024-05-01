import React from 'react'
import Departmentnavbar from "../components/utils/departmentnavigationbar"
export default function Departmentlayout({ children}) {
  return (
    <>
       <div >
        <Departmentnavbar />
         </div>
    <div>
        {children}
    </div>
  
    </>
  )
}
