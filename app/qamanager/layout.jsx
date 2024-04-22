import React from 'react'
import Sidebar from "../components/utils/qamanagersidebar"
export default function layout({ children }) {
  return (
    <>
    <Sidebar />
    <div className='qamanager-children'>
        {children}
    </div>
    </>
  )
}
