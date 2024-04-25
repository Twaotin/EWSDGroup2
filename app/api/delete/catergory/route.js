import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"

import {  NextResponse } from "next/server";
export async function POST(request) {
    try {
    const prisma = getPrismaInstance();
    const Data = await request.json() 
  console.log(Data.categoryid)
 const deletedRow = await prisma.categories.delete({
      where: {
        categoryid: Data.categoryid, 
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
