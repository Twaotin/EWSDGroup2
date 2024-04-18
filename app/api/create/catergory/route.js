import prisma from "../../auth/[...nextauth]/lib/prisma"
import {  NextResponse } from "next/server";
export async function POST(request) {
    try {
        
    const formData = await request.json() 

const catergoryData = {
  categoryname: formData.categoryName,
};

const newReport = await prisma.categories.create({
      data: catergoryData
    });
return NextResponse.json({ message: 'report submitted successfully!' })
    } catch (error) {
         console.error(error);
    return NextResponse.json({ message: 'Error processing request' });
    }

}