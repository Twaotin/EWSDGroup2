import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/options"
import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"
import {  NextResponse } from "next/server";
import { sendCommentNotification} from '../../../../app/node';
export async function POST(request) {
  const session = await getServerSession(authOptions)
  try {
       const prisma = getPrismaInstance();
 
        const formData = await request.json() 
        console.log(formData.ideaid)
      
        const commentData = {
  commenttext : formData.commenttext,
  commentdate: new Date(),
  isanonymous: formData.isanonymous ,
  idea: {
    connect: { ideaid: formData.ideaid}, 
  },
   user: {
    connect: { userid: session.user.userId}, 
  },

  
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
  }finally {
    await closePrismaInstance();
  }

}