import {  NextResponse } from "next/server";
import bcrypt from "bcrypt"; 
import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"
import { getServerSession } from "next-auth/next"

import { authOptions } from "../../auth/[...nextauth]/options"
export async function PATCH(request) {
    const session = await getServerSession(authOptions)
    try {
        const prisma = getPrismaInstance();
        const formData =  await request.json()
    console.log(formData)
      const userData = await prisma.users.findUnique({
      where: {
        userid:session.user.userId
      },
     
    });
      console.log("user:", userData)

    const match = await bcrypt.compare(formData.currentPassword, userData.password );
        if(match){
            const hashedpassword =await bcrypt.hash(formData.newPassword, 10); 
               const data =  {
        password: hashedpassword ,
        }
     const updatedUser = await prisma.users.update({
      where: { userid: session.user.userId },
      data: data,
    });
    return NextResponse.json({ message: 'Password Change Successful' });
        }else{
            console.log("not matched")
            return NextResponse.json({ message: 'Error processing request' });
        }

    }  catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error processing request' });
    }finally {
    await closePrismaInstance();
  }
}