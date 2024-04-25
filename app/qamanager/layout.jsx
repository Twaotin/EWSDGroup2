import React from 'react'
import Sidebar from "../components/utils/qamanagersidebar"
export default function layout({ children }) {
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
