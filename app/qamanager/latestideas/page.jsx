import React from 'react'
import Latest from "../../components/qamanager/latestideas"
import { Suspense } from 'react';
import Loading from "../loading"
export default function page() {
  return (
    <>
    <div>
      <h3>Latest Ideas</h3>
      <p>Current Latest</p>
    </div>
    <Suspense fallback={<Loading/>}>
    <Latest />
    </Suspense>
    
    </>
  )
}
