"use server"
import { getPrismaInstance, closePrismaInstance } from "../../../../auth/[...nextauth]/lib/prisma";
import { NextResponse, NextRequest } from 'next/server';


export async function GET(NextRequest) {
    try {
      const prisma = getPrismaInstance();
      const closuredateid = NextRequest.nextUrl.pathname.split('/').pop();  
      const ideasWithCommentsResults = await prisma.ideas.findMany({
        where: {
          comments: { some: {} },
          closuredateid: { equals:parseInt(closuredateid)}, 
        },
        select: {
          ideaid: true,
          ideatitle: true,
          department: { select: { departmentname: true } }, 
          comments: true, 
        },
      });

  return NextResponse.json(ideasWithCommentsResults)
    } catch (error) {
         console.log(error)
         return NextResponse.json({ message: 'Fetch Error ' });
    }finally {
    await closePrismaInstance();
  }
 
}