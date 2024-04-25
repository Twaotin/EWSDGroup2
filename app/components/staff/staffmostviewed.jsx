'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Pagination } from 'react-bootstrap';


const ViewedIdeas = () => {
  const router = useRouter();
  const [ideas, setIdeas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ideasPerPage = 5;
  const [sortedIdeas, setSortedIdeas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/api/fetch/idea');
      const data = await res.json();
      setIdeas(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (ideas) {
      
      const fetchAndSortIdeas = async () => {
        const updatedIdeas = await Promise.all(
          ideas.map(async (idea) => {
            const response = await fetch(`http://localhost:3000/api/fetch/views/${idea.ideaid}`);
            const viewCounts = await response.json();
            return { ...idea, count: viewCounts[0]?._count || 0 };
          })
        );
        setSortedIdeas(updatedIdeas.sort((a, b) => b.count - a.count));
      };

      fetchAndSortIdeas();
    }
  }, [ideas]);



  const indexOfLastIdea = currentPage * ideasPerPage;
  const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="staffideasContainer">
      {sortedIdeas.slice(indexOfFirstIdea, indexOfLastIdea).map((idea) => (
        <div key={idea.ideaid} className="staffidea">
          <h5>Idea Title: {idea.ideatitle}</h5>
          {idea.isanonymous ? <h5>By: Anonymous </h5> : <h5> By:{idea.user.username}</h5>} 
          {idea.isclosure && <h5>Closure date reached </h5> }
          <h5>Views: {idea.count}</h5>
          <Link href={`/staff/staffidea/${idea.ideaid}`} className=" buttonStyle">View</Link>
          
        </div>
      ))}
      
      <Pagination>
        {Array.from({ length: Math.ceil(sortedIdeas.length / ideasPerPage) }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default ViewedIdeas;
