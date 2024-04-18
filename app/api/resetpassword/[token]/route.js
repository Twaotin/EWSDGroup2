import crypto from 'crypto';
import bcrypt from "bcrypt";
import { passwordreset} from '../../../node';
import { NextResponse, NextRequest } from 'next/server';

import prisma from "../../auth/[...nextauth]/lib/prisma"
function passwordgenerate() {
  // Define magic 8-ball responses
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

  // Choose a random response from the list
  const randomResponse = array[Math.floor(Math.random() * array.length)];

  // Convert the response to bytes using UTF-8 encoding
  const responseBytes = Buffer.from(randomResponse, 'utf-8');

  // Generate random bytes for padding (optional)
  // You can adjust the number of random bytes for a longer hex string
  const paddingBytes = crypto.randomBytes(4);

  // Combine response and padding bytes
  const allBytes = Buffer.concat([responseBytes, paddingBytes]);

  // Convert the combined bytes to uppercase hex string
  return allBytes.toString('hex').toUpperCase();
}


export async function GET(NextRequest) {
    try {
      
       const token = NextRequest.nextUrl.pathname.split('/').pop();    
 console.log("token,,,",token)
      
      
      
 console.log(token)
const user = await prisma.users.findFirst({
  where: {
    AND: [
      { passwordreset: { equals: token } },
      { passwordresetexpire: { gt: new Date() } },
    ],
  },
});

console.log("useerr", user);
console.log(user.userid)
if( user) {
       
    const newpassword = passwordgenerate();
    const Passwordhash = await bcrypt.hash(newpassword, 10);
     await prisma.users.update({
  where: { userid: user.userid },
  data: {
    password: Passwordhash, // Replace with your password hashing logic
    passwordreset: undefined,
    passwordresetexpire: undefined, // Set an appropriate expiration time
  },
})
    await passwordreset(user.email, newpassword);

   return NextResponse.json({ message: 'Your new password has been sent to your email' })
}else{
    return NextResponse.json({ message: 'Your new password has been sent to your email' })
}
    } catch (error) {
      console.log(error)
         return NextResponse.json({ message: 'Error reset request' }, error);
         
    }
  
}