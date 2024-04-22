"use server"

import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from "next-auth/next"

import { authOptions } from "../../auth/[...nextauth]/options"
import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"

export async function GET(NextRequest) {
     const session = await getServerSession(authOptions)
    try {
       const prisma = getPrismaInstance();
       const userid = session.user.userId;
  const userIdeas = await prisma.ideas.findMany({
    where: {
      userid, 
    },
  });
   console.log(userIdeas)
  return NextResponse.json(userIdeas)
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching User Data ' });
    }finally {
    await closePrismaInstance();
  }
  
}