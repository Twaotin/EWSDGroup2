"use server"
import prisma from "../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
        const Users = await prisma.users.findMany({
            include: {
      department: true, // Include related department data
      roles: true,      // Include related role data // Include related ideaviews data
    }
        });
       console.log(Users)
  return NextResponse.json(Users)
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching User Data ' });
    }
  
}
