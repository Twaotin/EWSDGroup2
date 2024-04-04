import prisma from "../../auth/[...nextauth]/lib/prisma"
import {  NextResponse } from "next/server";


export async function PATCH(request) {
  const data = await request.json() 
      
 
   try {
  
  const updatedIdea = await prisma.ideas.update({
    where: { ideaid: data.ideaid  },
    data: {
      isthumbsdown: data.isthumbsdown // Set the thumbsDown count directly
    }
  });

  // Send a success response
  return NextResponse.json(updatedIdea);
} catch (error) {
  // Handle errors
  console.error('Error updating thumbs down count:', error.message);
  return res.status(500).json({ message: 'Internal Server Error' });
}

}