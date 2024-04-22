import React from 'react'
import Departmentideas from "../components/show/departmentideas"
import { Suspense } from 'react';
import Loading from "../loading"
export default function page() {
  return (
    <>
    <div>
      <h3>Your Department Staff Ideas</h3>
      <p>Current Department Staff Ideas</p>
    </div>
    <Suspense fallback={<Loading/>}>
      <Departmentideas />
    </Suspense>
   
    </>
  )
}
