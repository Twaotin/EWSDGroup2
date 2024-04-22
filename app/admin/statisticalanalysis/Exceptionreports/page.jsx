'use client'
import AnonymousChart  from "../../../components/stats/statsanonymous"
import IdeawithoutChart  from "../../../components/stats/statsideaswithoutcomments"

import React from 'react'
import { Suspense } from 'react';
import Loading from "../../loading"
export default function page() {
  return (
    <>
    <div>
      <h3>Exception Reports</h3>
      <p>Current Exception Reports</p>
    </div>
    <Suspense fallback={<Loading/>}>
    <IdeawithoutChart/>
    <AnonymousChart/>
    </Suspense>
    
    </>
  )
}
