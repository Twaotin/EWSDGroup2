import React from 'react'
import Latest from "../../components/admin/latestideas"
import { Suspense } from 'react';
import Loading from "../loading"
export default function page() {
  return (
    <>
    

    <div>
      <h3>Latest Ideas</h3>
      <p>Current Latest ideas</p>
    </div>
    <Suspense fallback={<Loading/>}>
    <Latest />
    </Suspense>
    
    </>
  )
}
