'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Popular = () => {
  const router = useRouter();
  const [ideas, setIdeas] = useState([]);
  const [thumbsUpCounts, setThumbsUpCounts] = useState({});
  const [thumbsDownCounts, setThumbsDownCounts] = useState({});
  const ideasPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/fetch/idea');
        if (!res.ok) {
          throw new Error('Failed to fetch ideas');
        }
        const data = await res.json();
        console.log(data);
        data.sort((idea1, idea2) => idea2.thumbsUpCounts - idea1.thumbsUpCounts);
        setIdeas(data);

        // Fetch thumbs up and down counts for all ideas (only on initial load)
        const fetchThumbsData = async () => {
          const allThumbsUpCounts = {};
          const allThumbsDownCounts = {};

          for (const idea of data) {
            const thumbsUpResponse = await fetch(`http://localhost:3000/api/fetch/thumbup/${idea.ideaid}`);
            const thumbsUpData = await thumbsUpResponse.json();
            allThumbsUpCounts[idea.ideaid] = thumbsUpData;

            const thumbsDownResponse = await fetch(`http://localhost:3000/api/fetch/thumbdown/${idea.ideaid}`);
            const thumbsDownData = await thumbsDownResponse.json();
            allThumbsDownCounts[idea.ideaid] = thumbsDownData;
          }

          setThumbsUpCounts(allThumbsUpCounts);
          setThumbsDownCounts(allThumbsDownCounts);
        };

        fetchThumbsData();
      } catch (error) {
        console.error('Error fetching ideas:', error);
      }
    };

    fetchData();
  }, []);

  // Function to calculate the start and end index for current page
  const getIndexOfIdeas = () => {
    const startIndex = (currentPage - 1) * ideasPerPage;
    const endIndex = Math.min(startIndex + ideasPerPage, ideas.length);
    return { startIndex, endIndex };
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {ideas.length > 0 ? (
        <>
          {/* Display ideas based on pagination */}
          {ideas.slice(getIndexOfIdeas().startIndex, getIndexOfIdeas().endIndex).map((idea, index) => (
            <div key={idea.ideaid}>
              <button type="button" onClick={() => router.push(`/api/idea/${idea.ideaid}`)}>
                View full
              </button>
              <h3>Idea Title: {idea.ideatitle}</h3>
              <div className="author">BY: {idea.user.username}</div>
               <div></div>
              {/* Additional idea details (optional) */}
            </div>
          ))}

          {/* Pagination logic */}
          <ul className="pagination">
            <li
              className={currentPage === 1 ? 'disabled' : ''}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </li>
            {Array.from({ length: Math.ceil(ideas.length / ideasPerPage) }, (_, index) => (
              <li key={index + 1} className={currentPage === index + 1 ? 'active' : ''}>
                <button onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li
              className={currentPage === Math.ceil(ideas.length / ideasPerPage) ? 'disabled' : ''}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </li>
          </ul>
        </>
      ) : (
        <p>No ideas found.</p>
      )}
    </div>
  );
};

export default Popular;
