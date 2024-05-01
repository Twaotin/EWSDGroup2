"use server"
import { getPrismaInstance, closePrismaInstance } from "../../../../auth/[...nextauth]/lib/prisma"; 
import { NextResponse, NextRequest } from 'next/server';


export async function GET(NextRequest) {
    try {
      const prisma = getPrismaInstance();
      const closuredateid = NextRequest.nextUrl.pathname.split('/').pop();  
      const results = await prisma.departments.findMany({
        where: {
          ideas: {
            some: {
              user: { roleid: { equals: 4 } },
              closuredateid: { equals: parseInt(closuredateid) }, 
            },
          },
        },
        select: {
          departmentname: true,
          _count: {
            select: { ideas: true },
          },
        },
      });

  return NextResponse.json(results)
    } catch (error) {
         console.log(error)
         return NextResponse.json({ message: 'Fetch Error ' });
    }finally {
    await closePrismaInstance();
  }
 
}
