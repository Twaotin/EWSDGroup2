'use client'
import DepartmentIdeaChart from "../../../../components/stats/statsperdepartment"
import IdeapercentageChart from "../../../../components/stats/statsideapercentage"
import Statdeptmentcontributors from "../../../../components/stats/statdeptmentcontributors"
import React from 'react'

export default function page({params}) {
  return (
   <>
   
     <div>
      <h3>Statistics Reports</h3>
      <p>Current Statistics Reports</p>
    </div>
 
   <DepartmentIdeaChart closuredateid={params.closuredateid}/>
   <IdeapercentageChart closuredateid={params.closuredateid}/>
    <Statdeptmentcontributors closuredateid={params.closuredateid}/>
    
   </>
  )
}