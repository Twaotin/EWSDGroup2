"use server"
import { getPrismaInstance, closePrismaInstance } from "../../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
      const prisma = getPrismaInstance();
        const anonymousCommentsResults = await prisma.ideas.findMany({
  where: {
    comments: {
      some: {
        isanonymous: true,
      },
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