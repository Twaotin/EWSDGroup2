"use server"
import prisma from "../../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
        const anonymousCommentsResults = await prisma.ideas.findMany({
  where: {
    comments: {
      some: {
        isanonymous: true, // Find ideas with at least one anonymous comment
      },
    },
  },
});

  return NextResponse.json(anonymousCommentsResults)
    } catch (error) {
         console.log(error)
         return NextResponse.json({ message: 'Fetch Error ' });
    }
 
}