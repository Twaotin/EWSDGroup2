import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"

import {  NextResponse } from "next/server";
export async function POST(request) {
    try {
        
        const prisma = getPrismaInstance();
    const formData = await request.json() 
 
 const deletedRow = await prisma.comments.delete({
      where: {
        commentid: formData.commentid,
      },
    });

return NextResponse.json({ message: 'Date Deletion successfully!' })
    } catch (error) {
         console.error(error);
    return NextResponse.json({ message: 'Error processing request' });
    }finally {
    await closePrismaInstance();
  }

}
