import React from 'react'
import Navbarstaff from "../components/sidebar"
import IdeaList from "../components/show/ideashow"
import Sidebar from "../components/highersidebar"
import ViewedIdeas from "../components/departmentcoordinator/mostviewedideas"
export default function page() {
  return (
    <div>
        <div className="pageContainer">
        <Sidebar />
         </div>
        <div className="contentContainer"> <ViewedIdeas /></div>
    </div>
    
    
  )
}
