"use server"
import { getPrismaInstance, closePrismaInstance } from "../../../auth/[...nextauth]/lib/prisma"; 
import { NextResponse, NextRequest } from 'next/server';

export async function GET(NextRequest) {
             const id = NextRequest.nextUrl.pathname.split('/').pop();    
 
    try {
       const prisma = getPrismaInstance();
       const count = await prisma.ideathumbup.count({
      where: {
        ideaid: parseInt(id)
      }
    });
    console.log("counttt",count)
  return NextResponse.json(count)
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching User Data ' });
    }finally {
    await closePrismaInstance();
  }
  
}
