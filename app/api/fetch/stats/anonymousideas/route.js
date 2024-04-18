"use server"
import prisma from "../../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
        const anonymousIdeasResults = await prisma.ideas.findMany({
  where: {
    OR: [
      { isanonymous: true }, // Find anonymous ideas
    ],
  },
});

  return NextResponse.json(anonymousIdeasResults)
    } catch (error) {
         console.log(error)
         return NextResponse.json({ message: 'Fetch Error ' });
    }
 
}