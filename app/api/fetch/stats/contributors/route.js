"use server"
import { getPrismaInstance, closePrismaInstance } from "../../../auth/[...nextauth]/lib/prisma"; 
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
       const prisma = getPrismaInstance();
        const results = await prisma.departments.findMany({
  where: {
    ideas: { some: { user: { roleid: { equals: 4 } } } }, 
  },
  select: {
    departmentname: true,
    _count: {
      select: { ideas: true },
    },
  },
});

  return NextResponse.json(results)
    } catch (error) {
         console.log(error)
         return NextResponse.json({ message: 'Fetch Error ' });
    }finally {
    await closePrismaInstance();
  }
 
}