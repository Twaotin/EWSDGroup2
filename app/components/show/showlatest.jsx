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
    <div>
      {currentIdeas.map((idea) => (
        <div key={idea.ideaid}>
          <button type="button" onClick={() => router.push(`/api/idea/${idea.ideaid}`)}>
            Comments
          </button>
          <h3>Idea Title: {idea.ideatitle}</h3>
          <div className="author">BY: {idea.user.username} and email: {idea.user.email}</div>
          <div className="author"> Body: {idea.ideatext}</div>
          <div>{idea.submissiondate}</div>
        </div>
      ))}
      {/* Pagination */}
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