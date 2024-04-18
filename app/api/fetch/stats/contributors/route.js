"use server"
import prisma from "../../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
        const results = await prisma.departments.findMany({
  where: {
    ideas: { some: { user: { roleid: { equals: 4 } } } }, // Filters departments with ideas from users with roleid = 4
  },
  select: {
    departmentname: true,
    _count: {
      select: { ideas: true }, // Counts ideas related to each department
    },
  },
});

  return NextResponse.json(results)
    } catch (error) {
         console.log(error)
         return NextResponse.json({ message: 'Fetch Error ' });
    }
 
}