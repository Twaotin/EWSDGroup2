"use server"
import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"; 
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
        const prisma = getPrismaInstance();
        const roles = await prisma.roles.findMany({
          
        });
         console.log(roles)
       
  return NextResponse.json(roles)
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching Role Data ' });
    }finally {
    await closePrismaInstance();
  }
  
}
