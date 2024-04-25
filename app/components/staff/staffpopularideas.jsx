'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Pagination from 'react-bootstrap/Pagination'; 

const Popular = () => {
  const router = useRouter();
  const [thumbsUpCounts, setThumbsUpCounts] = useState({});
  const [ideas, setIdeas] = useState([]);
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

        
        const fetchThumbsData = async () => {
          const allThumbsUpCounts = {};
          

          for (const idea of data) {
            const thumbsUpResponse = await fetch(`http://localhost:3000/api/fetch/thumbup/${idea.ideaid}`);
            const thumbsUpData = await thumbsUpResponse.json();
            allThumbsUpCounts[idea.ideaid] = thumbsUpData;
          }

          setThumbsUpCounts(allThumbsUpCounts);
        };

        fetchThumbsData();
      } catch (error) {
        console.error('Error fetching ideas:', error);
      }
    };

    fetchData();
  }, []);

  
  const getIndexOfIdeas = () => {
    const indexOfLastIdea = currentPage * ideasPerPage;
    const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;
    return { startIndex: indexOfFirstIdea, endIndex: indexOfLastIdea };
  };


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="staffideasContainer">
      {ideas.length > 0 ? (
        <>
         
          {ideas.slice(getIndexOfIdeas().startIndex, getIndexOfIdeas().endIndex).map((idea, index) => (
            <div key={idea.ideaid} className="staffidea">
              
              <h3>Idea Title: {idea.ideatitle}</h3>
              {idea.isanonymous ? <h5>By: Anonymous </h5> : <h5> By:{idea.user.username}</h5>} 
              {idea.isclosure && <h5>Closure date reached </h5> }
             <Link href={`/staff/staffidea/${idea.ideaid}`} className="buttonStyle">View</Link>
            </div>
          ))}

         
          <Pagination>
            {Array.from({ length: Math.ceil(ideas.length / ideasPerPage) }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      ) : (
        <p>No ideas found.</p>
      )}
    </div>
  );
};

export default Popular