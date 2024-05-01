import React from 'react'
import Departmentideas from "../components/show/departmentideas"
import { getServerSession } from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]/options"
import { Suspense } from 'react';
import Loading from "../loading"
export default async function page() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className='welcome'>
            <h4>Welcome {session.user.email} </h4> 
         </div>
      <div>  
      <h3>Your Department Staff Ideas</h3>
      <p>Current Department Staff Ideas</p>
    </div>
    <Suspense fallback={<Loading/>}>
      <Departmentideas />
    </Suspense>
   
    </>
  )
}
