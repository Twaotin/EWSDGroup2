'use client'
import { getServerSession } from "next-auth";
import {authOptions} from "../../api/auth/[...nextauth]/options"
import React from 'react'

async function Welcome() {
  const session = await getServerSession(authOptions);
  return (
    <>
   
      <div className='welcome'>
            <h4>Welcome {session.user.email} </h4> 
         </div>
    </>

  )
}

export default Welcome;