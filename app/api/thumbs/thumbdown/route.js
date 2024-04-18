import prisma from "../../auth/[...nextauth]/lib/prisma"
import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/options"

export async function POST(request) {
  const session = await getServerSession(authOptions)
  const data = await request.json() 
      
 
   try { 
          const existingView = await prisma.ideathumbdown.findFirst({
            where: {
                ideaid: parseInt(data.ideaid),
                userid: session.user.userId
                
            } 
        });
            if(existingView) {
              return NextResponse.json({ message: ' You have already given a thumbs up to this idea!' })
            }else{
        const thumbup = {

                ideaid: parseInt(data.ideaid),
                userid: session.user.userId
            };
            await prisma.ideathumbdown.create({
                data: thumbup
            });
          }
   

  // Send a success response
  return NextResponse.json({ message: ' successfully idea thumbsdown!' });
} catch (error) {
  // Handle errors
  console.error('Error updating thumbs down count:', error.message);
  return res.status(500).json({ message: 'Internal Server Error' });
}

}