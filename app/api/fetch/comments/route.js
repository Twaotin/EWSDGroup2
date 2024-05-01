 "use server"
import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma";  
import {  NextResponse } from "next/server"

export async function GET(request) {
  try {
     const prisma = getPrismaInstance();
    
      const comment = await prisma.comments.findMany({
        include: {
            user: true,
 },
     });
  
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ message: 'Error Fetching idea Data ' });
  }finally {
    await closePrismaInstance();
  }
   
}

