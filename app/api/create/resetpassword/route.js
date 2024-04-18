
import prisma from "../../auth/[...nextauth]/lib/prisma"
import {  NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid'
import { passwordresetemail} from '../../../node';
export async function POST(request) {
  try {
      const data = await request.json();
      console.log(data)
      const user = prisma.users.findUnique({
  where: { email: { equals: data.email } },
});
const email = data.email
 if (user) {
        const token = uuidv4();
        const token_duration = 24 * 60 * 60 * 1000;
        await prisma.users.update({
        where: {
          email ,
        },
        data: {
          passwordreset: token,
          passwordresetexpire: new Date(Date.now() + token_duration),
        },
      });
      await passwordresetemail(email, token);
        return NextResponse.json({ message: 'Email reset email sent!' })
  } else{
    console.log("User not found")
  } 

    } catch (error) {
        return NextResponse.json({ message: 'Error processing request' });
    }
  
}