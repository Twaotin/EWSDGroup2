"use server"
import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse } from 'next/server';


export async function GET(request) {
   const prisma = getPrismaInstance();
   try {
     const categories = await prisma.categories.findMany({
      select: {
        categoryid: true,
        categoryname: true,
      },
    });
  return NextResponse.json(categories)
   } catch (error) {
   return NextResponse.json({ message: 'Error Fetching categories' });
   }finally {
    await closePrismaInstance();
  }
 
}