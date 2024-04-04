import React from 'react'
import prisma from "../../auth/[...nextauth]/lib/prisma"
import Link from 'next/link'
import CommentForm from '../../../components/createcomment'
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

        });

        console.log("comment:", comment);
        
        return comment;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return null;
    }
}


export default async function details({params}) {
   const idea = await ideas(params.id)
   
    const comments = await comment(params.id)
    console.log(comments)
    
  return (
    <>
    <h1>Idea:{idea.ideatitle}</h1>
    <div>{idea.ideaid}</div>
    <div>{idea.userid}</div>
    <div>{idea.departmentid}</div>
    <div>{idea.ideatext}</div>
    
    <div>Comment{comments.commenttext}</div>
    <div>{comments.commenttext}</div>
     <div>
      <h2>Comments</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.commentid}>
              <p>{comment.commenttext}</p>
              {comment.user && (
                <p>
                  By: {comment.user.username} (user ID: {comment.user.userid})
                </p>
              )}
              <p>Date: {comment.commentdate.toLocaleString()}</p>
             
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments found for this idea.</p>
      )}
    </div>
     <CommentForm  id={params.id}/>
    <Link href={'/ideas'}>Back</Link>
    </>
  )
}
