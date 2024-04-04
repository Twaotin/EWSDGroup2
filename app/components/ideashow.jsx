"use client"
import React, { useEffect, useState } from 'react';

const IdeaList = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/api/fetch/idea');
      const data = await res.json();
      setIdeas(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {ideas.map((idea) => (
        <div key={idea.ideaid}>
          <h3>Idea Title: {idea.ideatitle}</h3>
        <div className="author">BY: {idea.user.username} and email: {idea.user.email}</div>
         
          <div className="author"> Body: {idea.ideatext}</div>
          <p>Categories: {idea.ideacategories.map((ic) => ic.category.categoryname).join(', ')}</p>
          {/* Add more details as needed */}
        </div>
        
      ))}
    </div>
  );
};

export default IdeaList