import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"

import { authOptions } from "../../auth/[...nextauth]/options"
import prisma from "../../auth/[...nextauth]/lib/prisma"

export async function POST(request) {
  const session = await getServerSession(authOptions)
  try {
   
     
        const formData = await request.formData();
        const isAnonymous = formData.get('isAnonymous') === 'false' ? false : true;
     
    const categoryId = parseInt(formData.get('categoryValue'));

const ideaData = {
  userid: session.user.userId,
  departmentid: session.user.departmentId,
  closuredateid: 1,
  ideatext: formData.get('ideaText'),
  submissiondate: new Date(),
  isenabled: true,
  isanonymous: isAnonymous,
  isinvestigated: false,
  isthumbsup: 0,
  isthumbsdown: 0,
  ideatitle: formData.get('ideaTitle'), 
 
};

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
   }catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error processing request' });
  }

}
