import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/options"
import prisma from "../../auth/[...nextauth]/lib/prisma"
import {  NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions)
  try {
   
      // File upload requested, generate pre-signed URL
        const formData = await request.json() 
        console.log(formData.ideaid)
        const isAnonymous = formData.isAnonymous === 'false' ? false : true;
        const commentData = {
  //userid: session.user.userId,
  //ideaid: 2, 
  commenttext : formData.commenttext,
  commentdate: new Date(),
  isanonymous: isAnonymous ,
  idea: {
    connect: { ideaid: formData.ideaid}, // Connect to existing idea with ID 2
  },
   user: {
    connect: { userid: session.user.userId}, // Connect to existing idea with ID 2
  },

  // ... other idea data (potentially including file ID or reference)
};
 
await prisma.comments.create({
  data: commentData, 
});


     
     
      return NextResponse.json({ message: 'Idea submitted successfully!' })
   }catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error processing request' });
  }

}