'use client'
import DepartmentIdeaChart from "../../../components/stats/statsperdepartment"
import IdeapercentageChart from "../../../components/stats/statsideapercentage"
import Statdeptmentcontributors from "../../../components/stats/statdeptmentcontributors"
import React from 'react'
import { Suspense } from 'react';
import Loading from "../../loading"
export default function page() {
  return (
   <>
   
     <div>
      <h3>Statistics Reports</h3>
      <p>Current Statistics Reports</p>
    </div>
    <Suspense fallback={<Loading/>}>
   <DepartmentIdeaChart/>
   <IdeapercentageChart/>
    <Statdeptmentcontributors/>
    </Suspense>
   </>
  )
}
