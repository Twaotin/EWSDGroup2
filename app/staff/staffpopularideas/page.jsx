import React from 'react'
import Popular from "../../components/staff/staffpopularideas"
import { Suspense } from 'react';
import Loading from "../loading"
export default function page() {
  return (
    <>
     <div>
      <h3>Popular Ideas</h3>
      <p>Current Popular Ideas</p>
    </div>
    <Suspense fallback={<Loading/>}>
    <Popular />
    </Suspense>
    
    </>
  )
}
