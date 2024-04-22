"use server"
import { getPrismaInstance, closePrismaInstance } from "../../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse, NextRequest } from 'next/server';


export async function GET(NextRequest) {
          
  const id = NextRequest.nextUrl.pathname.split('/').pop();    

    try {
      const prisma = getPrismaInstance();
       const viewCounts =  await prisma.ideaviews.groupBy({
            by: ['ideaid'],
             where: {
               ideaid: parseInt(id), // Filter by the specific ideaid
                },
             _count: true,
                  }); 
const count = viewCounts[0]?._count || 0;
       console.log(viewCounts)
  return NextResponse.json(viewCounts)
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching User Data ' });
    }finally {
    await closePrismaInstance();
  }

  
}