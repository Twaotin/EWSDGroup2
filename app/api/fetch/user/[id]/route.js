"use server"
import prisma from "../../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse, NextRequest } from 'next/server';


export async function GET(NextRequest) {
             const id = NextRequest.nextUrl.pathname.split('/').pop();    
 //console.log("token,,,",token)
   //console.log("iddd..", NextRequest)
    try {
        const userData = await prisma.users.findUnique({
      where: {
        userid:parseInt(id) // Assuming the ID is an integer
      },
      include: {
        department: true,
        roles: true
        // Include any other related data as needed
      }
    });
       console.log(userData)
  return NextResponse.json(userData)
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching User Data ' });
    }
  
}