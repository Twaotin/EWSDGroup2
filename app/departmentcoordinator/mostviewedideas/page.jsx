import React from 'react'
import ViewedIdeas  from "../../components/departmentcoordinator/mostviewedideas"
import { Suspense } from 'react';
import Loading from "../loading"
export default function page() {
  return (
    <>
    <div>
      <h3>Most Viewed Ideas</h3>
      <p>Current Most Viewed  Ideas</p>
    </div>
    <Suspense fallback={<Loading/>}>
     <ViewedIdeas />
    </Suspense>
   
    </>
  )
}
