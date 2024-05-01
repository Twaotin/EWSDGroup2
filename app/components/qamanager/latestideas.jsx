"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Pagination } from 'react-bootstrap';

const Latest = () => {
  const router = useRouter();
  const [ideas, setIdeas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ideasPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/api/fetch/idea');
      const data = await res.json();
      data.sort((idea1, idea2) => new Date(idea2.submissiondate) - new Date(idea1.submissiondate));
      setIdeas(data);
    };

    fetchData();
  }, []);

  const indexOfLastIdea = currentPage * ideasPerPage;
  const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;
  const currentIdeas = ideas.slice(indexOfFirstIdea, indexOfLastIdea);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="staffideasContainer">
       {currentIdeas.length > 0 ? (
      currentIdeas.map((idea) => (
        <div key={idea.ideaid} className="staffidea">
          <div >
          <h5>Idea Title: {idea.ideatitle}</h5>
         <h5> By:{idea.user.username}</h5>
            <h5>{idea.submissiondate}</h5>
            {idea.isclosure && <h5>Closure date reached </h5>}
          {idea.isfinalclosure && <h5>Final Closure date reached </h5> }
          <Link href={`/qamanager/idea/${idea.ideaid}`} className=" buttonStyle">View</Link>
          </div>
        </div>
      ))
      ) : (
        <h2>No ideas found</h2> 
      )}
      
      <Pagination>
        {Array.from({ length: Math.ceil(ideas.length / ideasPerPage) }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default Latest;