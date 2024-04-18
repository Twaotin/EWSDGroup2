"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link'

import { useRouter } from 'next/navigation'


const IdeaListtwo = () => {
  const [ideas, setIdeas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ideasPerPage = 2;
  const [thumbsUp, setThumbsUp] = useState(ideas.IsThumbsUp);
  const [thumbsDown, setThumbsDown] = useState(ideas.IsThumbsDown);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/api/fetch/idea');
      const data = await res.json();
      setIdeas(data);
    };

    fetchData();
  }, []);


  const handleThumbsUp = async ({ idea }) => {
  try {
    console.log("ideas::::", idea);
    const updatedIdea = {
      ...idea,
      isthumbsup : idea.isthumbsup  + 1 // Increment the thumbs down count
    };

   
    setIdeas(prevIdeas => prevIdeas.map(prevIdea => prevIdea.ideaid === idea.ideaid ? updatedIdea : prevIdea));

    
    const response = await fetch(`http://localhost:3000/api/thumbs/thumbup`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isthumbsup: idea.isthumbsup + 1, ideaid: idea.ideaid }) // Send the new thumbsDown count and ideaid to the server
    });

    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      throw new Error('Failed to update thumbs down count');
    }
  } catch (error) {
    console.error('Error updating thumbs down count:', error.message);
  }
};

const handleThumbsDown = async ({ idea }) => {
  try {
    console.log("ideas::::", idea);
    const updatedIdea = {
      ...idea,
      isthumbsdown: idea.isthumbsdown + 1 // Increment the thumbs down count
    };

    // Update the state with the new thumbs down count locally
    setIdeas(prevIdeas => prevIdeas.map(prevIdea => prevIdea.ideaid === idea.ideaid ? updatedIdea : prevIdea));

    // Send a request to the server to update the thumbs down count in the database
    const response = await fetch(`http://localhost:3000/api/thumbs/thumbdown`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isthumbsdown: idea.isthumbsdown + 1, ideaid: idea.ideaid }) 
    });

    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      throw new Error('Failed to update thumbs down count');
    }
  } catch (error) {
    console.error('Error updating thumbs down count:', error.message);
  }
};
  console.log("ideas here", ideas.ideaid)

  const indexOfLastIdea = currentPage * ideasPerPage;
  const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;
  const currentIdeas = ideas.slice(indexOfFirstIdea, indexOfLastIdea);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
const router = useRouter()
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

export default IdeaListtwo;