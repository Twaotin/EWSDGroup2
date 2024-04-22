"use server"
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next"

import { authOptions } from "../../auth/[...nextauth]/options"
import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"

export async function GET(NextRequest) {
     const session = await getServerSession(authOptions)
    try {
       const prisma = getPrismaInstance();
       const departmentid = session.user.departmentId;
  const departmentIdeas = await prisma.ideas.findMany({
    where: {
      departmentid, 
    },
  });
   console.log(departmentIdeas)
  return NextResponse.json(departmentIdeas)
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching User Data ' });
    }finally {
    await closePrismaInstance();
  }
  
}