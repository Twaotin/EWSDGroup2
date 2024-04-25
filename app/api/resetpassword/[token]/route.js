import crypto from 'crypto';
import bcrypt from "bcrypt";
import { passwordreset} from '../../../node';
import { NextResponse, NextRequest } from 'next/server';

import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"
function passwordgenerate() {
 
  const array = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
    "You may rely on it.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful.",
    "Don't bet on it."
  ];

  
  const randomResponse = array[Math.floor(Math.random() * array.length)];


  const responseBytes = Buffer.from(randomResponse, 'utf-8');

  const paddingBytes = crypto.randomBytes(4);

  const allBytes = Buffer.concat([responseBytes, paddingBytes]);

  return allBytes.toString('hex').toUpperCase();
}


export async function GET(NextRequest) {
    try {
      const prisma = getPrismaInstance();
       const token = NextRequest.nextUrl.pathname.split('/').pop();    
 
const user = await prisma.users.findFirst({
  where: {
    AND: [
      { passwordreset: { equals: token } },
      { passwordresetexpire: { gt: new Date() } },
    ],
  },
});


if( user) {
       
    const newpassword = passwordgenerate();
    const Passwordhash = await bcrypt.hash(newpassword, 10);
     await prisma.users.update({
  where: { userid: user.userid },
  data: {
    password: Passwordhash, 
    passwordreset: undefined,
    passwordresetexpire: undefined, 
  },
})
    await passwordreset(user.email, newpassword);

    return NextResponse.redirect(new URL('/login', NextRequest.url));
}
    } catch (error) {
      console.log(error)
         return NextResponse.json({ message: 'Error reset request' }, error);
         
    }finally {
    await closePrismaInstance();
  }
  
}