import  Admindash from "../components/admin/admindash"
import React from 'react'
import { getServerSession } from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]/options"
async function Adminpage() {
  const session = await getServerSession(authOptions);
  return (
    <>
        <div className='welcome'>
            <h4>Welcome {session.user.email} </h4> 
         </div>
      <Admindash />
      <div >
        
         </div>
    </>

  )
}

export default Adminpage;