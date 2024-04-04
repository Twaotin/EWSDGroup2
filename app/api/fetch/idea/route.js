 "use server"
import prisma from "../../auth/[...nextauth]/lib/prisma";  
import {  NextResponse } from "next/server"

export async function GET(request) {
      const ideas = await prisma.ideas.findMany({
    include: {
      user: true,
      ideacategories: {
        include: {
          category: true,
        },
      },
    },
  });
  console.log(ideas)
    return NextResponse.json(ideas);
   
}

