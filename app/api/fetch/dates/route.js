"use server"
import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma";
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
        const prisma = getPrismaInstance();
     const Dates = await prisma.ideadates.findMany();

  return NextResponse.json(Dates)
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching Idea dates Data ' });
    }finally {
    await closePrismaInstance();
  }
  
}
