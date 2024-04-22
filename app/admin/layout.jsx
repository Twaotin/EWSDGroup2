import React from 'react'
import Sidebar from "../components/utils/adminsidebar"
export default function Adminlayout({ children }) {
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
