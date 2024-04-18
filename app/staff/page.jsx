import React from 'react'
import { getServerSession } from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]/options"
import Link from "next/link";
  
export default  async function staffdashboard() {
     const session = await getServerSession(authOptions);
  return (
   <>
    <div className='staffdashmain'> 
        
         <div className=''>
            <h1>Welcome : {session.user.email} </h1>
         </div>
        

       <div className=''>
         <Link href="/api/auth/signout?callbackUrl=/">Logout3</Link>
       </div>

    </div>
    
   </>
  )
}
