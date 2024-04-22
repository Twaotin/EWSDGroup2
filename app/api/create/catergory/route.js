import  { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma" 
import {  NextResponse } from "next/server";
export async function POST(request) {
    try {
       const prisma = getPrismaInstance();
    const formData = await request.json() 

const categoryData = {
  categoryname: formData.categoryName,
};

const newReport = await prisma.categories.create({
      data: categoryData
    });
return NextResponse.json({ message: 'Category submitted successfully!' })
    } catch (error) {
         console.error(error);
    return NextResponse.json({ message: 'Error processing request' });
    }finally {
    // Close the Prisma client instance to release the database connection
    await closePrismaInstance();
  }

}