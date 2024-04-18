"use client"
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const fetcher = (url) => fetch(url).then((res) => res.json());

const ViewedIdeas = () => {
  const router = useRouter()
  const { data: ideas, error } = useSWR('http://localhost:3000/api/fetch/idea', fetcher, { refreshInterval: 500 }); // Revalidate data every 1 second
  const [currentPage, setCurrentPage] = useState(1);
  const ideasPerPage = 5;

   const [sortedIdeas, setSortedIdeas] = useState([]);

 useEffect(() => {
    if (ideas) {
      // Fetch view counts for each idea on the client-side
      const fetchAndSortIdeas = async () => {
        const updatedIdeas = await Promise.all(
          ideas.map(async (idea) => {
            const response = await fetch(`http://localhost:3000/api/fetch/views/${idea.ideaid}`);
            const viewCounts = await response.json();
            return { ...idea, count: viewCounts[0]?._count || 0 }; // Add count property to each idea
          })
        );
        setSortedIdeas(updatedIdeas.sort((a, b) => b.count - a.count));
      };

      fetchAndSortIdeas();
    }
  }, [ideas]);
  // Fetch view counts for each idea
  
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

  // Sorting function based on count
  

  const indexOfLastIdea = currentPage * ideasPerPage;
  const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) return <div>Error loading ideas...</div>;
  if (!ideas) return <div>Loading...</div>;

  return (
    <div>
      {sortedIdeas.slice(indexOfFirstIdea, indexOfLastIdea).map((idea) => (
            <div key={idea.ideaid}>
              <button type="button" onClick={() => router.push(`/api/idea/${idea.ideaid}`)}>
                Comments
              </button>
              <h3>Idea Title: {idea.ideatitle}</h3>
              <div className="author">BY: {idea.user.username} and email: {idea.user.email}</div>
              <div className="author">Body: {idea.ideatext}</div>
              <p>Views: {idea.count}</p>
              <button onClick={() => handleThumbsUp(idea)}>Thumbs Up {idea.isthumbsup}</button>
             
              <button onClick={() => handleThumbsDown(idea)}>Thumbs Down {idea.isthumbsdown}</button>
            </div>
          ))}
      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(sortedIdeas.length / ideasPerPage) }, (_, index) => (
          <li key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewedIdeas;  