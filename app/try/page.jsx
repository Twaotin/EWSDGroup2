'use client'

import React from 'react'
import Popular  from "../components/show/popularideasw"
import DepartmentIdeaChart from "../components/stats/statsperdepartment"
import Statdeptmentcontributors from "../components/stats/statdeptmentcontributors"
import IdeawithoutChart  from "../components/stats/statsideaswithoutcomments"
import Latestideas from "../components/show/latestideasw"
import AnonymousChart  from "../components/stats/statsanonymous"
import IdeapercentageChart from "../components/stats/statsideapercentage"
export default function page() {
  return (
    <div>
      <Popular />
      <DepartmentIdeaChart/>
      <Statdeptmentcontributors/>
      <IdeawithoutChart/>
      <AnonymousChart/>
      <IdeapercentageChart/>
    </div>
  )
}