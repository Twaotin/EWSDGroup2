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
    const user = await prisma.users.findUnique({
      where: {
        userid:parseInt(session.user.userId) 
      }
    });
    const ideaid = formData.ideaid;
    const idea = await prisma.ideas.findUnique({
      where: {
        ideaid,
      }
    });
    if (!user.isactive) {
      return NextResponse.json({ message: 'cannot submit comment, user blocked!' })
    } else {

      const closureDates = await prisma.ideadates.findMany();

      const currentDate = new Date();
      const closureDate = closureDates.find(date => date.closuredateid  === idea.closuredateid);
      console.log("closuredate...", closureDate)
      if (closureDate && currentDate > closureDate.closuredate) {
        idea.isclosure = true;
      }else{
        idea.isclosure = false;
      }
      const finalClosureDate = closureDates.find(date => date.closuredateid  === idea.closuredateid);
       console.log("finalClosureDate...", finalClosureDate)
      if (finalClosureDate && currentDate > finalClosureDate.finalclosuredate) {
        idea.isfinalclosure = true;
      }else{
        idea.isfinalclosure = false;
      }
      console.log(idea.isfinalclosure)
      if (idea.isfinalclosure) {
        return NextResponse.json({ message: 'cannot submit comment, final closure date reached!' })
      } else {
       
        console.log(formData.ideaid)
      
        const commentData = {
          commenttext: formData.commenttext,
          commentdate: new Date(),
          isanonymous: formData.isanonymous,
          idea: {
            connect: { ideaid: formData.ideaid },
          },
          user: {
            connect: { userid: session.user.userId },
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
      }
    }
   }catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error processing request' });
  }finally {
    await closePrismaInstance();
  }

}