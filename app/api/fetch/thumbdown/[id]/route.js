"use server"
import prisma from "../../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse, NextRequest } from 'next/server';

export async function GET(NextRequest) {
             const id = NextRequest.nextUrl.pathname.split('/').pop();    
 
    try {
       const count = await prisma.ideathumbdown.count({
      where: {
        ideaid: parseInt(id)
      }
    });
    console.log("counttt",count)
  return NextResponse.json(count)
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching User Data ' });
    }
  
}