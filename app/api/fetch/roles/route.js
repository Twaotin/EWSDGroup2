"use server"
import prisma from "../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
        const roles = await prisma.roles.findMany({
          
        });
         console.log(roles)
       //console.log(roles )
  return NextResponse.json(roles)
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching Roles Data ' });
    }
  
}
