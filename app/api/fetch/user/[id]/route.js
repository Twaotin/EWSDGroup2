"use server"
import { getPrismaInstance, closePrismaInstance } from "../../../auth/[...nextauth]/lib/prisma";
import { NextResponse, NextRequest } from 'next/server';


export async function GET(NextRequest) {
             const id = NextRequest.nextUrl.pathname.split('/').pop();    
    try {
       const prisma = getPrismaInstance();
        const userData = await prisma.users.findUnique({
      where: {
        userid:parseInt(id) 
      },
      include: {
        department: true,
        roles: true
      
      }
    });
       console.log(userData)
  return NextResponse.json(userData)
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching User Data ' });
    }finally {
    await closePrismaInstance();
  }
  
}