"use server"
import { getPrismaInstance, closePrismaInstance }from "../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
        const prisma = getPrismaInstance();
        const departments = await prisma.departments.findMany({
           
        });
       console.log(departments)
  return NextResponse.json(departments)
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching Department Data ' });
    }finally {
    await closePrismaInstance();
  }
  
}
