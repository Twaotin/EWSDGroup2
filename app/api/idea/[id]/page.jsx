import React from 'react'
import prisma from "../../auth/[...nextauth]/lib/prisma"
import Link from 'next/link'
import CommentForm from '../../../components/create/createcomment'
import { authOptions } from "../../auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import Createreport from "../../../components/create/createreport"
async function ideas(id) {
    let field = await prisma.ideas.findUnique({
  where: {
    ideaid:parseInt(id) 
  },
  
});
;
 return field
}
async function comment(id) {
    try {
        let comment = await prisma.comments.findMany({
            where: {
                ideaid: parseInt(id)
            },
            orderBy: {
                commentdate: 'desc'
            },
            include: {
                user: true // Assuming the name of the relation is User
            }
        });
        console.log("comment:", comment);
        
        return comment;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return null;
    }
}
async function recordView(id) {
   const session = await getServerSession(authOptions)
 
    // Check if the user has a specific role before proceeding
  if (session.user.role === "staff") {
    try {
      // Check if the user has already visited the page
      const existingView = await prisma.ideaviews.findFirst({
        where: {
          ideaid: parseInt(id),
          userid: session.user.userId
        }
      });
      
      const viewCounts = await prisma.ideaviews.groupBy({
        by: ['ideaid'],
        where: {
          ideaid: parseInt(id),
        },
        _count: true,
      }); 
      const count = viewCounts[0]?._count || 0;
      console.log("viewCounts", count);
      
      // If the user hasn't visited the page, insert a new record
      if (!existingView) {
        console.log("enter checked");
        const view = {
          ideaid: parseInt(id),
          userid: session.user.userId
        };
        await prisma.ideaviews.create({
          data: view
        });
      } else {
        console.log("not entered");
      }
    } catch (error) {
      console.error("Error recording view:", error);
    }
  } else {
    console.log("User does not have the required role.");
  }
}


export default async function details({params}) {
   const idea = await ideas(params.id)
   await recordView(params.id)
    const comments = await comment(params.id)
    console.log(comments)
    
  return (
    <>
    <h1>Idea:{idea.ideatitle}</h1>
    <div>{idea.ideatext}</div>
    
    <div>Comment{comments.commenttext}</div>
    <div>{comments.commenttext}</div>
     <div>
      <h2>Comments</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.commentid}>
              {comment.isanonymous ? <h4>By: Anonymous </h4> :  <p>By: {comment.user.username} </p>} 
              <p>{comment.commenttext}</p>
              <p>Date: {comment.commentdate.toLocaleString()}</p>
             
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments found for this idea.</p>
      )}
    </div>
     <CommentForm  id={params.id}/>
     <Createreport  id={params.id}/>
    <Link href={'/popularideas'}>Back</Link>
    </>
  )
}
