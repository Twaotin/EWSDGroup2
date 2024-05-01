import React from 'react'

import Adminbnavbar from "../components/utils/adminnavigationbar"
export default function Adminlayout({ children }) {
  return (
    <>
    <div className="">
        <Adminbnavbar />
         </div>
    <div className="">
        {children}
    </div>
    </>
  )
}
