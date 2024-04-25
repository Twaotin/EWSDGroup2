"use server"
import { getPrismaInstance, closePrismaInstance } from "../../../auth/[...nextauth]/lib/prisma"; 
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
      const prisma = getPrismaInstance();
        const ideasWithoutCommentsResults = await prisma.ideas.findMany({
  where: {
    comments: { none: {} }, 
  },
  select: {
    ideaid: true,
    ideatitle: true, 
    department: { select: { departmentname: true } }, 
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