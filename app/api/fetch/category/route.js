"use server"
import prisma from "../../auth/[...nextauth]/lib/prisma"; // Assuming correct path
import { NextResponse } from 'next/server';


export async function GET(request) {
  const categories = await prisma.categories.findMany({
      select: {
        categoryid: true,
        categoryname: true,
      },
    });
  return NextResponse.json(categories)
}