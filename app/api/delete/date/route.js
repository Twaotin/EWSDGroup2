import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"

import {  NextResponse } from "next/server";
export async function POST(request) {
    try {
        
        const prisma = getPrismaInstance();
    const formData = await request.json() 
  console.log(formData.closuredateid)
 const deletedRow = await prisma.ideadates.delete({
      where: {
        closuredateid: formData.closuredateid, // Assuming the primary key column name is 'id'
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
