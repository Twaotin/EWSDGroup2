"use server"
import { getPrismaInstance, closePrismaInstance } from "../../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
      const prisma = getPrismaInstance();
       const totalIdeas = await prisma.ideas.count();
const results = await prisma.departments.findMany({
  select: {
    departmentname: true,
    _count: {
      select: { ideas: true }, // Counts ideas related to each department
    },
  },
});

// Iterate through department data and calculate percentages
results.forEach((department) => {
  department.ideaPercentage = (department._count.ideas / totalIdeas) * 100;
});

  return NextResponse.json(results)
    } catch (error) {
         console.log(error)
         return NextResponse.json({ message: 'Fetch Error ' });
    }finally {
    await closePrismaInstance();
  }
 
}