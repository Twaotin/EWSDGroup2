"use client"
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const fetcher = (url) => fetch(url).then((res) => res.json());


const Ideasshow = () => {
  const router = useRouter()
  const { data: ideas, error } = useSWR('http://localhost:3000/api/fetch/idea', fetcher, { refreshInterval: 500 });
  const [currentPage, setCurrentPage] = useState(1);
  const ideasPerPage = 2;
  
  const handleThumbsUp = async (idea) => {
    try {
      
      // Optimistically update the UI
      // No need to call setIdeas since SWR will automatically revalidate the data
      const response = await fetch(`http://localhost:3000/api/thumbs/thumbup`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isthumbsup: idea.isthumbsup + 1, ideaid: idea.ideaid })
      });

      if (!response.ok) {
        throw new Error('Failed to update thumbs up count');
      }
    } catch (error) {
      console.error('Error updating thumbs up count:', error.message);
    }
  };

const handleThumbsDown = async (idea) => {
  try {
    
   
    // Send a request to the server to update the thumbs down count in the database
    const response = await fetch(`http://localhost:3000/api/thumbs/thumbdown`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isthumbsdown: idea.isthumbsdown + 1, ideaid: idea.ideaid }) 
    });

    const responseData = await response.json();
    //console.log(responseData);

    if (!response.ok) {
      throw new Error('Failed to update thumbs down count');
    }
  } catch (error) {
    console.error('Error updating thumbs down count:', error.message);
  }
};
 console.log("ideasss", ideas)
  const indexOfLastIdea = currentPage * ideasPerPage;
  const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;
  const currentIdeas = ideas.slice(indexOfFirstIdea, indexOfLastIdea);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {currentIdeas.map((idea) => (
        <div key={idea.ideaid}>
          
           <button type="button" onClick={() => router.push(`/api/idea/${idea.ideaid}`)}>
      Comments
    </button>
          <h3>Idea Title: {idea.ideatitle}</h3>
          
          {idea.isanonymous ? <h4>By: Anonymous </h4> :  <p>By: {idea.user.username} </p>} 
          <div className="author"> Body: {idea.ideatext}</div>
          <p>Categories: {idea.ideacategories.map((ic) => ic.category.categoryname).join(', ')}</p>
          <p>Thumbs Up: {idea.isthumbsup}</p>
           <button onClick={() => handleThumbsUp({idea}) }>Thumbs Up</button>
          <p>Thumbs Down: {idea.isthumbsdown}</p>
           <button onClick={() => handleThumbsDown({idea})}>Thumbs Down</button>
           {idea.isclosure && <h4>Closure reached </h4>}
           {idea.isfinalclosure  && <h4>Finale closure  reached </h4>}
          
        </div>
      ))}
      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(ideas.length / ideasPerPage) }, (_, index) => (
          <li key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ideasshow ;