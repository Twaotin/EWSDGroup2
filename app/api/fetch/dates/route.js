"use server"
import prisma from "../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
         const Dates = await prisma.ideadates.findMany();
    
      
  return NextResponse.json(Dates)
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching Idea dates Data ' });
    }
  
}
