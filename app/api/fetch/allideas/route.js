"use server"
import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma";  
import {  NextResponse } from "next/server"

export async function GET(request) {
  try {
     const prisma = getPrismaInstance();
     const ideas = await prisma.ideas.findMany({
  include: {
             user: true,
             department: true, 
    ideacategories: {
      include: {
        category: true,
      },
    },
    ideadate: true, 
  },
});
  const closureDates = await prisma.ideadates.findMany();

    const currentDate = new Date();

  ideas.forEach(idea => {
    const closureDate = closureDates.find(date => date.closuredateid  === idea.closuredateid);
    console.log("closuredate...", closureDate)
    if (closureDate && currentDate > closureDate.closuredate) {
      idea.isclosure = true;
    }else{
      idea.isclosure = false;
    }
    const finalClosureDate = closureDates.find(date => date.closuredateid  === idea.closuredateid);
     console.log("finalClosureDate...", finalClosureDate)
    if (finalClosureDate && currentDate > finalClosureDate.finalclosuredate) {
      idea.isfinalclosure = true;
    }else{
      idea.isfinalclosure = false;
    }
  });
  console.log(ideas)
    return NextResponse.json(ideas);
  } catch (error) {
    return NextResponse.json({ message: 'Error Fetching idea Data ' });
  }finally {
    await closePrismaInstance();
  }
   
}

