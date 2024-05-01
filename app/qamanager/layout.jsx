import React from 'react'
import Qamanagernavbar from "../components/utils/qamanagernavigationbar"
export default function layout({ children }) {
  return (
    <>
    <div >
        <Qamanagernavbar/>
         </div>
    <div >
        {children}
    </div>
    </>
  )
}
