import React from 'react'
import Popular from "../../components/admin/popularideas"
import { Suspense } from 'react';
import Loading from "../loading"
export default function page() {
  return (
    <>
    <div>
      <h3>Popular Ideas</h3>
      <p>Current Popular ideas</p>
    </div>
    <Suspense fallback={<Loading/>}>
    <Popular />
    </Suspense>
    </>
  )
}
