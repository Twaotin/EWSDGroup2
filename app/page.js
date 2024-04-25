import {authOptions} from "../app/api/auth/[...nextauth]/options"
import Link from "next/link";
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth";
import { getPrismaInstance, closePrismaInstance } from "../app/api/auth/[...nextauth]/lib/prisma";

export default async function Home() {
  const prisma = getPrismaInstance();
   const session = await getServerSession(authOptions);
   console.log("session in home page ",session)

 if (!session || !session.user) {
  console.log("home page")
    redirect("/api/auth/signin");
}
if(session.user.role == "staff") {
  redirect("/staff")
}

if(session.user.role == "Admin") {
  redirect("/admin")
}

if(session.user.role == "QA Manager") {
  redirect("/qamanager")
}
if(session.user.role == "QADeptment Coordinator") {
  redirect("/departmentcoordinator")
}

  return (
     <>
    <div>Home</div>
    
      <Link href="/api/auth/signout?callbackUrl=/">Logout3</Link>
     </>
  );
}
