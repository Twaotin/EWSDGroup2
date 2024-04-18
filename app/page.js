import {authOptions} from "../app/api/auth/[...nextauth]/options"
import Link from "next/link";
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth";
import prisma from "./api/auth/[...nextauth]/lib/prisma";

export default async function Home() {
   const session = await getServerSession(authOptions);
   console.log("session in home page ",session)
  // console.log("session  user check in home page ",session.user.role)
 if (!session || !session.user) {
  console.log("home page")
    redirect("/api/auth/signin");
}
if(session.user.role == "staff") {
  redirect("/staff")
}


//	Anonymous ideas and comments.
const anonymousData = await prisma.ideas.findMany({
  where: {
    OR: [ // Find ideas or comments that are anonymous
      { isanonymous: true }, // Anonymous ideas
      { comments: { some: { isanonymous: true } } }, // Ideas with at least one anonymous comment
    ],
  },
  select: {
    ideaid: true,
    ideatitle: true, // You can select other idea fields
    isanonymous: true,
    department: { select: { departmentname: true } }, // Get department name for the idea
    comments: {
      select: {
        commentid: true,
        commenttext: true, // You can choose to include or exclude comment text based on privacy concerns
        isanonymous: true,
      },
    },
  },
});

console.log("anonymousData",anonymousData);

 //Ideas without a comment
const ideasWithoutComments = await prisma.ideas.findMany({
  where: {
    comments: { none: {} }, // Filters ideas with no comments
  },
  select: {
    ideaid: true,
    ideatitle: true, // You can add other idea fields for selection
    department: { select: { departmentname: true } }, // Get department name for the idea
  },
});

console.log("ideasWithoutComment",ideasWithoutComments);


//	Number of contributors within each Department
const departmentIdeaCounp = await prisma.departments.findMany({
  where: {
    ideas: { some: { user: { roleid: { equals: 4 } } } }, // Filters departments with ideas from users with roleid = 4
  },
  select: {
    departmentname: true,
    _count: {
      select: { ideas: true }, // Counts ideas related to each department
    },
  },
});

console.log( "contributors within each Department",departmentIdeaCounp);


//Number of Ideas Made by Each Department
const departmentIdeaCount = await prisma.departments.findMany({
  select: {
    departmentname: true,
    _count: {
      select: { ideas: true }, // Counts ideas related to each department
    },
  },
});

console.log("deas Made by Each Department",departmentIdeaCount);

//Percentage of Ideas by Each Department
const totalIdeas = await prisma.ideas.count();
const departmentIdeaCoun = await prisma.departments.findMany({
  select: {
    departmentname: true,
    _count: {
      select: { ideas: true }, // Counts ideas related to each department
    },
  },
});

// Iterate through department data and calculate percentages
departmentIdeaCoun.forEach((department) => {
  department.ideaPercentage = (department._count.ideas / totalIdeas) * 100;
});

console.log("Percentage of Ideas by Each Department",departmentIdeaCoun);
//console.log(session)
  return (
     <>
    <div>Home</div>
    
      <Link href="/api/auth/signout?callbackUrl=/">Logout3</Link>
     </>
  );
}
