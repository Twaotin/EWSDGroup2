import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"
import {  NextResponse } from "next/server";
export async function POST(request) {
    try {
        
    const prisma = getPrismaInstance();
    const formData = await request.json() 

const dateData = {
  academicyear: formData.academicyear,
  opendate: formData.opendate,
  closuredate: formData.closuredate,
  finalclosuredate : formData.finalclosuredate
};

const newReport = await prisma.ideadates.create({
      data: dateData 
    });
return NextResponse.json({ message: 'report submitted successfully!' })
    } catch (error) {
         console.error(error);
    return NextResponse.json({ message: 'Error processing request' });
    }finally {
    await closePrismaInstance();
  }

}