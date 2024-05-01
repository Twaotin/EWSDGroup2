'use client'
import { useState } from 'react';
import React from 'react'
import useSWR from 'swr';
import Table from 'react-bootstrap/Table';

import Deletecomment from "../buttons/deletecomment"
import Deleteidea from "../buttons/deleteidea"
import { useRouter } from 'next/navigation'
function  Maindata() {
const router = useRouter()


   const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: ideas, error :ideasError } = useSWR('http://localhost:3000/api/fetch/allideas', fetcher, { refreshInterval: 1000 });
     const { data: comments, error : commentsError } = useSWR('http://localhost:3000/api/fetch/comments', fetcher, { refreshInterval: 1000 });
      
      if (ideasError) return <div>Error loading data</div>;
       if (!ideas) return <div>Loading...</div>;

       if (commentsError) return <div>Error loading data</div>;
       if (!comments) return <div>Loading...</div>;
  return (
    <>

    <div className='tabledata'>
        <h2>Ideas table</h2>
     <Table responsive   striped>
      <thead>
        <tr>
           <th>#</th>
          <th>Userid</th>
          <th>Departmentid</th>
          <th>idea Text</th>
          <th>Idea Title</th>
          <th>submission Date</th>
          <th>Delete Idea</th>
        </tr>
      </thead>
      <tbody>
          {ideas.map((idea) => (
              <tr key={idea.ideaid}>
            <td>{idea.ideaid}</td> 
             <td>{idea.userid}</td> 
            <td>{idea.department.departmentname}</td> 
              <td>{idea.ideatext }</td>
              <td>{idea.ideatitle}</td> 
              <td>{idea.submissiondate}</td>
             
            
              
            
    <td> <Deleteidea ideaid={idea.ideaid}/></td>
            </tr>
          ))}
      </tbody>
    </Table>
          </div>
          
        

     <div className='tabledata'>
        <h2>Comments table</h2>
     <Table responsive striped>
      <thead>
        <tr>
           <th>#</th>
              <th>Idea id</th>
              <th>Email</th>
          <th>Comment Text</th>
          <th>Comment Date</th>
          <th>Delete Comment</th>
          
        </tr>
      </thead>
      <tbody>
          {comments.map((comment) => (
            <tr key={comment.commentid }>
              <td>{comment.commentid  }</td>
              <td>{comment.ideaid}</td> 
              <td>{comment.user.email}</td>
              <td>{comment.commenttext }</td>
              <td>{comment.commentdate}</td>
           
         
    <td><Deletecomment commentid={comment.commentid} /></td>
    
            </tr>
          ))}
      </tbody>
    </Table>
     </div>
    </>
  )
}

export default Maindata;


