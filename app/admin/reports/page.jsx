import React from 'react'
import Reports from "../../components/show/showreports"
import { Suspense } from 'react';
import Loading from "../loading"
export default function Userreports() {
  return (
    <>
     <div>
      <h3>User Reports</h3>
      <p>Current User Reports</p>
    </div>
    <Suspense fallback={<Loading/>}>
    <Reports />
    </Suspense>
    
    </>
  )
}
