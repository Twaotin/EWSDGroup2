import {  NextResponse } from "next/server";
import bcrypt from "bcrypt"; 
import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/options"
export async function PATCH(request) {
  const prisma = getPrismaInstance();
     const session = await getServerSession(authOptions)
    try {
        
         const formData =  await request.json()
    console.log(formData)
    
  
  const data =  {
        reviewer: session.user.email,
        reviewstatus: "Resolved",
  }
     console.log(data)
     const updatedUser = await prisma.ideareports.update({
      where: { reportid: formData.reportid},
      data: data,
    });
 return NextResponse.json({ message: 'user Edit successfully!' })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error processing request' });
    }finally {
    await closePrismaInstance();
  }
   

    
}

