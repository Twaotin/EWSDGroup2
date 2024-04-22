"use server"
import { getPrismaInstance, closePrismaInstance } from "../../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse, NextRequest } from 'next/server';


export async function GET(NextRequest) {
  try {
    const prisma = getPrismaInstance();
    const userIdeas = await prisma.ideas.findMany({
    where: {
      userid, // Retrieve ideas with the specified user ID
    },
    include: {
    },
  });
  } catch (error) {
    
  }
}