"use server"
import prisma from "../../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
         const ideasWithCommentsResults = await prisma.ideas.findMany({
  where: {
    comments: { some: {} }, // Filters ideas with comments
  },
  select: {
    ideaid: true,
    ideatitle: true, // You can add other idea fields for selection
    department: { select: { departmentname: true } }, // Get department name for the idea
    comments: true, // Include comments associated with each idea
  },
});

  return NextResponse.json(ideasWithCommentsResults)
    } catch (error) {
         console.log(error)
         return NextResponse.json({ message: 'Fetch Error ' });
    }
 
}