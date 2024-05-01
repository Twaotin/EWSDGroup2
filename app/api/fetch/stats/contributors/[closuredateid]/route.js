"use server"
import { getPrismaInstance, closePrismaInstance } from "../../../../auth/[...nextauth]/lib/prisma"; 
import { NextResponse, NextRequest } from 'next/server';


export async function GET(NextRequest) {
    try {
      const prisma = getPrismaInstance();
      const closuredateid = NextRequest.nextUrl.pathname.split('/').pop();  
      const results = await prisma.departments.findMany({
        where: {
            ideas: {
                some: {
                    closuredateid: parseInt(closuredateid),
                },
            },
        },
        select: {
            departmentname: true,
            users: {
                where: {
                    ideas: {
                        some: {
                            closuredateid: parseInt(closuredateid),
                        },
                    },
                },
                distinct: ['userid'], 
            },
        },
    });

    
    const contributers = results.map(dept => ({
        departmentname: dept.departmentname,
        contributorCount: dept.users.length, 
    }));

    return NextResponse.json(contributers);
 
    } catch (error) {
         console.log(error)
         return NextResponse.json({ message: 'Fetch Error ' });
    }finally {
    await closePrismaInstance();
  }
 
}
