import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"

import {  NextResponse } from "next/server";
export async function POST(request) {
    try {
        
        const prisma = getPrismaInstance();
    const formData = await request.json() 
  console.log(formData.userid)
 const deletedRow = await prisma.users.delete({
      where: {
        userid: formData.userid, 
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
