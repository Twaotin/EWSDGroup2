import React from 'react'
import ViewedIdeas from "../../components/qamanager/mostviewedideas"
import { Suspense } from 'react';
import Loading from "../loading"
export default function page() {
  return (
   <>
   <div>
      <h3>Most Viewed  Ideas</h3>
      <p>Current Most Viewed </p>
    </div>
    <Suspense fallback={<Loading/>}>
    <ViewedIdeas />
    </Suspense>
   
   </>
  )
}
