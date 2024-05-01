'use client'
import AnonymousChart  from "../../../../components/stats/statsanonymous"
import IdeawithoutChart  from "../../../../components/stats/statsideaswithoutcomments"

import React from 'react'


export default function page({params}) {
  return (
    <>
    <div>
      <h3>Exception Reports</h3>
      <p>Current Exception Reports</p>
    </div>
    
    <IdeawithoutChart closuredateid={params.closuredateid}/>
    <AnonymousChart closuredateid={params.closuredateid}/>
   
    
    </>
  )
}