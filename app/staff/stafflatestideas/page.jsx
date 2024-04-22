import React from 'react'
import Latest from "../../components/staff/stafflatestideas"
import { Suspense } from 'react';
import Loading from "../loading"
export default function page() {
  return (
    <>
     <div>
      <h3>Latest Ideas</h3>
      <p>Current Latest  Ideas</p>
    </div>
    <Suspense fallback={<Loading/>}>
    <Latest />
    </Suspense>
    
    </>
  )
}
