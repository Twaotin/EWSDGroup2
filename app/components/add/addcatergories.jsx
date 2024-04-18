'use client'
import React, { useState } from 'react';

const CategoryForm = () => {
   const [formData, setFormData] = useState({
    categoryName: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const response = await fetch("http://localhost:3000/api/create/catergory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    if (!response.ok) {
          throw new Error("Form submission failed");
        }


        const responseData = await response.json();
        console.log(responseData);
  };

  const handleInputChange = (e) => {
    setFormData({ categoryName: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="categoryName">Category Name:</label>
        <input
          type="text"
          id="categoryName"
          value={formData.categoryName}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CategoryForm;