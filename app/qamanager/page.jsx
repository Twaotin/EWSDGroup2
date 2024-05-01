import Qamanager from "../components/qamanager/qamanagerdash"
import React from 'react'
import { getServerSession } from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]/options"
export default async function QamanagerDashboard() {
  const session = await getServerSession(authOptions);
  return (
    <> 
      <div className='welcome'>
            <h4>Welcome {session.user.email} </h4> 
         </div>
    <Qamanager />
    </>
  )
}