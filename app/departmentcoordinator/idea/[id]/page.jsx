import React from 'react'
import { getPrismaInstance, closePrismaInstance } from "../../../api/auth/[...nextauth]/lib/prisma"
import Link from 'next/link'
import CommentForm from '../../../components/create/createcomment'
import { authOptions } from "../../../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import Createreport from "../../../components/create/createreport"
import { NextResponse, NextRequest } from 'next/server';
import { Suspense } from 'react';
import Loading from "../../loading"
async function ideas(id) {
  try {
    const prisma = getPrismaInstance();
      let field = await prisma.ideas.findUnique({
  where: {
    ideaid:parseInt(id) 
  },
  
});

 return field
  } catch (error) {
    return NextResponse.json({ message: 'Error Fetching idea Data ' });
  }finally {
    await closePrismaInstance();
  }

  
}
async function comment(id) {
    try {
       const prisma = getPrismaInstance();
        let comment = await prisma.comments.findMany({
            where: {
                ideaid: parseInt(id)
            },
            orderBy: {
                commentdate: 'desc'
            },
            include: {
                user: true 
            }
        });
        console.log("comment:", comment);
        
        return comment;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return null;
    }

}
export async function thumbsup(id) {
    try {
       const prisma = getPrismaInstance();
       const count = await prisma.ideathumbup.count({
      where: {
        ideaid: parseInt(id)
      }
    });
    
 
  console.log("count for thumbup",count)
  return count;
    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching User Data ' });
    }finally {
    await closePrismaInstance();
  }
  
}
export async function thumbdown(id) {
    try {
      const prisma = getPrismaInstance();
       const count = await prisma.ideathumbdown.count({
      where: {
        ideaid: parseInt(id)
      }
    });
    return count

    } catch (error) {
        console.error(error);
    return NextResponse.json({ message: 'Error Fetching User Data ' });
    }finally {
    await closePrismaInstance();
  }
  
}
async function recordView(id) {
   const session = await getServerSession(authOptions)
 
   
  if (session.user.role === "staff") {
    try {
      const prisma = getPrismaInstance();
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
    }finally {
    await closePrismaInstance();
  }
  } else {
    console.log("User does not have the required role.");
  }
}


export default async function details({params}) {
   const idea = await ideas(params.id)
   const thumbups= await thumbsup(params.id)
  const thumbdowns= await thumbdown(params.id)
   await recordView(params.id)
    const comments = await comment(params.id)
    console.log(comments)
    
  return (
    <>
    <div className='ideacontainer'>
    <div className='ideashow'>
      <Suspense fallback={<Loading/>}>
    <h1 className='centertext'>{idea.ideatitle}</h1>
    <div className='centertext'> <h3>{idea.ideatext}</h3></div>
     
    <div>{comments.commenttext}</div>
    <div>{comments.commenttext}</div>
     <div className='commentcontainer'>
      <div className='commentsubcontainer'>
      <h2 className='centertext'>Comments</h2>
      <div className='commentrenderer'>
        <div className='commentrenderersub'>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.commentid}>
                <h4> {comment.user.username} </h4>
              <p>{comment.commenttext}</p>
              <p>Date: {comment.commentdate.toLocaleString()}</p>
              
            </li>
          ))}
        </ul>
      ) : (
        <p className='centertext'>No comments found for this idea.</p>
      )}
      </div>
      </div>
    <div>Thumbs Ups: {thumbups}</div> 
    <div> thumbs down: {thumbdowns}</div>
    <div>
    
     </div>
     </div>
     </div>
     
    
    </Suspense>
    </div>
    </div>
    </>
  )
}
