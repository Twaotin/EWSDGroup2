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
        
         <div className='welcome'>
            <h4>Welcome {session.user.email} </h4> 
         </div>
         
         <div>
      <h3>Your Ideas</h3>
   
    </div>
    <Suspense fallback={<Loading/>}>
     <Userideas />
    </Suspense>
          

    </div>
    
   </>
  )
}
