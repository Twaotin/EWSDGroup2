"use server"
import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
        const prisma = getPrismaInstance();
         const reports = await prisma.ideareports.findMany();
    
  return NextResponse.json(reports)
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching reports Data ' });
    }finally {
    await closePrismaInstance();
  }
  
}