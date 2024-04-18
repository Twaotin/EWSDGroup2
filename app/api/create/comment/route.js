import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/options"
import prisma from "../../auth/[...nextauth]/lib/prisma"
import {  NextResponse } from "next/server";
import { sendCommentNotification} from '../../../../app/node';
export async function POST(request) {
  const session = await getServerSession(authOptions)
  try {
   
      // File upload requested, generate pre-signed URL
        const formData = await request.json() 
        console.log(formData.ideaid)
       // const isAnonymous = formData.isanonymous === 'false' ? false : true;
        const commentData = {
  //userid: session.user.userId,
  //ideaid: 2, 
  commenttext : formData.commenttext,
  commentdate: new Date(),
  isanonymous: formData.isanonymous ,
  idea: {
    connect: { ideaid: formData.ideaid}, // Connect to existing idea with ID 2
  },
   user: {
    connect: { userid: session.user.userId}, // Connect to existing idea with ID 2
  },

  // ... other idea data (potentially including file ID or reference)
};
 const id = {
  ideaid: formData.ideaid
 }
await prisma.comments.create({
  data: commentData, 
});

await sendCommentNotification(commentData, id);
     
     
      return NextResponse.json({ message: 'Idea submitted successfully!' })
   }catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error processing request' });
  }

}