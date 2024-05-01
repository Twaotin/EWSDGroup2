"use server"
import { getPrismaInstance, closePrismaInstance } from "../../../../auth/[...nextauth]/lib/prisma";
import { NextResponse, NextRequest } from 'next/server';


export async function GET(NextRequest) {
    try {
      const prisma = getPrismaInstance();
      const closuredateid = NextRequest.nextUrl.pathname.split('/').pop();   
      console.log(closuredateid)
      const anonymousCommentsResults = await prisma.ideas.findMany({
        where: {
          comments: {
            some: {
              isanonymous: true,
            },
          },
          closuredateid: {
            equals: parseInt(closuredateid) , 
          },
        },
      });

  return NextResponse.json(anonymousCommentsResults)
    } catch (error) {
         console.log(error)
         return NextResponse.json({ message: 'Fetch Error ' });
    }finally {
    await closePrismaInstance();
  }
 
}