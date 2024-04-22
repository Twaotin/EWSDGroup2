import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/options"
import {  NextResponse } from "next/server";
export async function POST(request) {
    try {
        const prisma = getPrismaInstance();
         const session = await getServerSession(authOptions)
    const formData = await request.json() 

const reportData = {
  reportdate: new Date(),
  reporttext: formData.reporttext,
  reportsubject: formData.reportsubject,
  reviewstatus: "pending" ,
  reviewer: null,
 idea: { connect: { ideaid: formData.ideaid } }, // Connect to existing idea
 user: { connect: { userid: session.user.userId } }, 
};

const newReport = await prisma.ideareports.create({
      data: reportData 
    });
return NextResponse.json({ message: 'report submitted successfully!' })
    } catch (error) {
         console.error(error);
    return NextResponse.json({ message: 'Error processing request' });
    }finally {
    await closePrismaInstance();
  }
   


}


