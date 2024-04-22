"use server"
import { getPrismaInstance, closePrismaInstance } from "../../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
      const prisma = getPrismaInstance();
        const ideasWithoutCommentsResults = await prisma.ideas.findMany({
  where: {
    comments: { none: {} }, // Filters ideas without comments
  },
  select: {
    ideaid: true,
    ideatitle: true, // You can add other idea fields for selection
    department: { select: { departmentname: true } }, // Get department name for the idea
  },
})

  return NextResponse.json(ideasWithoutCommentsResults)
    } catch (error) {
         console.log(error)
         return NextResponse.json({ message: 'Fetch Error ' });
    }finally {
    await closePrismaInstance();
  }

 
}