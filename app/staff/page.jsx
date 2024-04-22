import React from 'react'
import { getServerSession } from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]/options"
import Link from "next/link";
import Userideas  from "../components/show/userideas"
  import { Suspense } from 'react';
import Loading from "../loading"
export default  async function staffdashboard() {
     const session = await getServerSession(authOptions);
  return (
   <>
    <div > 
        
         <div className=''>
            <h3>Welcome : {session.user.email} </h3>
         </div>
         
         <div>
      <h3>Your Ideas</h3>
      <p> Your  Current Ideas</p>
    </div>
    <Suspense fallback={<Loading/>}>
     <Userideas />
    </Suspense>
          

    </div>
    
   </>
  )
}
