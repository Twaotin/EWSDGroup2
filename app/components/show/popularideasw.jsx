"use client"
import React, { useState, useEffect } from 'react';
//import useSWR, { mutate } from 'swr';
import Link from 'next/link'
import { useRouter } from 'next/navigation'



const Popular = () => {
  const router = useRouter()
  const [ideas, setIdeas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ideasPerPage = 5;
const [thumbsUpCounts, setThumbsUpCounts] = useState({});
const [thumbsDownCounts, setThumbsDownCounts] = useState({});


 
  useEffect(() => {
    // Fetch thumbs-up counts for each idea

   const fetchData = async () => {
      const res = await fetch('http://localhost:3000/api/fetch/idea');
      const data = await res.json();
      data.sort((idea1, idea2) => idea2.thumbsUpCounts - idea1.thumbsUpCounts);
    console.log("data...", data)
      setIdeas(data);
    };

    fetchData();
    const fetchThumbsUpCounts = async () => {
      if (ideas) {
        const thumbsUpCountsData = {};
        await Promise.all(ideas.map(async (idea) => {
          const response = await fetch(`http://localhost:3000/api/fetch/thumbup/${idea.ideaid}`);
          const data = await response.json();
          thumbsUpCountsData[idea.ideaid] = data;
          console.log(data)
        }));
        setThumbsUpCounts(thumbsUpCountsData);
      }
    };

    fetchThumbsUpCounts();
  }, [ideas]);

  useEffect(() => {
    // Fetch thumbs-up counts for each idea
    const fetchThumbsDownCounts = async () => {
      if (ideas) {
        const thumbsdownCountsData = {};
        await Promise.all(ideas.map(async (idea) => {
          const response = await fetch(`http://localhost:3000/api/fetch/thumbdown/${idea.ideaid}`);
          const data = await response.json();
          thumbsdownCountsData[idea.ideaid] = data;
          console.log(data)
        }));
        setThumbsDownCounts(thumbsdownCountsData);
      }
    };
 
    fetchThumbsDownCounts();
  }, [ideas]);
  const handleThumbsUp = async (idea) => {
    try {
      const response = await fetch(`http://localhost:3000/api/thumbs/thumbup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ideaid: idea.ideaid })
      });

      const responseData = await response.json();
       console.log(responseData)
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update thumbs up count');
      }
      setThumbsUpCounts((prevThumbsUpCounts) => ({
      ...prevThumbsUpCounts,
      [idea.ideaid]: responseData.count, // Update count for specific idea
    }));

    // Trigger re-render with updated thumbs up count
    //mutate('localhost:3000/api/fetch/thumbup');
    } catch (error) {
      console.error('Error updating thumbs up count:', error.message);
    }
  };
   const handleThumbsDown = async (idea) => {
    try {
      const response = await fetch(`http://localhost:3000/api/thumbs/thumbdown`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ideaid: idea.ideaid })
      });

      const responseData = await response.json();
       console.log(responseData)
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update thumbs down count');
      }
       //mutate('http://localhost:3000/api/thumbs/thumbdown');
    } catch (error) {
      console.error('Error updating thumbs down count:', error.message);
    }
  };
  
  // Similar implementation for handleThumbsDown

  const indexOfLastIdea = currentPage * ideasPerPage;
  const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;
  const sortedIdeas = ideas ? [...ideas].sort((a, b) => b.isthumbsup - a.isthumbsup) : [];
  const currentIdeas = sortedIdeas.slice(indexOfFirstIdea, indexOfLastIdea);
const sortedCurrentIdeas = currentIdeas.sort((a, b) => thumbsUpCounts[b.ideaid] - thumbsUpCounts[a.ideaid]);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


console.log(thumbsUpCounts)
  return (
    <div>
      {sortedCurrentIdeas.map((idea) => (
        <div key={idea.ideaid}>
          <button type="button" onClick={() => router.push(`/api/idea/${idea.ideaid}`)}>
            Comments
          </button>
          <h3>Idea Title: {idea.ideatitle}</h3>
          <div className="author">BY: {idea.user.username} and email: {idea.user.email}</div>
          <div className="author"> Body: {idea.ideatext}</div>

          <button onClick={() => handleThumbsUp(idea)}>Thumbs Up {thumbsUpCounts[idea.ideaid]}</button>
          <p>Thumbs Down: {idea.isthumbsdown}</p>
          <button onClick={() => handleThumbsDown(idea)}>Thumbs Down {thumbsDownCounts[idea.ideaid]}</button>
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

export default Popular;