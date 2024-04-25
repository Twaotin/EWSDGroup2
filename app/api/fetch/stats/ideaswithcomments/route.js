"use server"
import { getPrismaInstance, closePrismaInstance } from "../../../auth/[...nextauth]/lib/prisma";
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
      const prisma = getPrismaInstance();
         const ideasWithCommentsResults = await prisma.ideas.findMany({
  where: {
    comments: { some: {} }, 
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