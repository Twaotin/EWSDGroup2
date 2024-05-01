import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"

import { authOptions } from "../../auth/[...nextauth]/options"
import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"
import { sendIdeaSubmissionNotification } from '../../../../app/node';
export async function POST(request) {
  const session = await getServerSession(authOptions)
  try {
   
    const prisma = getPrismaInstance();
    const user = await prisma.users.findUnique({
      where: {
        userid:parseInt(session.user.userId) 
      }
    });
    if (!user.isactive) {
      return NextResponse.json({ message: 'cannot submit Idea, user blocked!' })
    } else {
      const formData = await request.json()
      const Anonymous = formData.isanonymous;
      const isAnonymous = JSON.parse(Anonymous);
     

      const categoryId = parseInt(formData.categoryValue);
      console.log(categoryId)
      const submissionDate = new Date('2025-02-15');
      console.log("submissionDate", submissionDate)
 

      const closureData = await prisma.ideadates.findFirst({
        where: {
          opendate: { lte: submissionDate },
          closuredate: { gte: submissionDate },
        },
        orderBy: {
          opendate: 'desc'
        }
      });
      console.log("closureData var", closureData)

      if (!closureData) {
        throw new Error('Closure date not found for the given submission date');
      }

      const closureDateId = closureData.closuredateid;
    
      const ideaData = {
        userid: session.user.userId,
        departmentid: session.user.departmentId,
        closuredateid: closureDateId,
        ideatext: formData.ideaText,
        submissiondate: submissionDate,
        isclosure: false,
        isfinalclosure: false,
        isanonymous: isAnonymous,
        ideatitle: formData.ideaTitle,
 
      };

      await sendIdeaSubmissionNotification(ideaData);
      console.log("diea", ideaData)
      const newIdeaWithCategory = await prisma.ideas.create({
        data: {
          ...ideaData,
          ideacategories: {
            create: {
              categoryid: categoryId,
            },
          },
        },
        include: {
          ideacategories: true,
        },
      });

      return NextResponse.json({ message: 'Idea submitted successfully!' })
    }
   }catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error processing request' });
  }finally {
    await closePrismaInstance();
  }

}
