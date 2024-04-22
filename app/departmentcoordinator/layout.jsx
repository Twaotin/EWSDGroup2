import React from 'react'
import Sidebar from "../components/utils/departmentsidebar"
export default function Departmentlayout({ children}) {
  return (
    <>
    <Sidebar />

    <div className='departmentcoordinator-children'>
      {children}
    </div>
    </>
  )
}
