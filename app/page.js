import {authOptions} from "../app/api/auth/[...nextauth]/options"
import Link from "next/link";
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth";

export default async function Home() {
   const session = await getServerSession(authOptions);
   console.log("session in home page ",session)
  // console.log("session  user check in home page ",session.user.role)
 if (!session || !session.user) {
  console.log("home page")
    redirect("/api/auth/signin");
}
if(session.user.email) {
  console.log("user sessiop present")
}
//console.log(session)
  return (
     <>
    <div>Home</div>
    
      <Link href="/api/auth/signout?callbackUrl=/">Logout3</Link>
     </>
  );
}
