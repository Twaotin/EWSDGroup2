"use client"
import React, { useState, useEffect } from 'react';

export default function CreateIdea () {
  const [formData, setFormData] = useState({
    ideaTitle: "",
    ideaText: "",
    categoryValue: "",
    isAnonymous: false,
    agreedTCs: false,
     //file: null,
  });
  
  const [errors, setErrors] = useState({});

  const [categories, setCategories] = useState([]);
   

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fetch/category');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, categoryValue: value });
  };

   function handleOnChange(e) {
    const target = e.target;
    const files = target.files;

    if (files && files.length > 0) {
        const data = files[0];
        setFormData({ ...formData, file: data });
       
    }
}



  const handleRegistration = async (e) => {
    e.preventDefault();
   console.log(formData) 
      
    const newErrors = {};
    if (!formData.ideaTitle.trim()) {
      newErrors.ideaTitle = "Title cannot be blank";
    }
    if (!formData.ideaText.trim()) {
      newErrors.ideaText = "Text cannot be blank";
    }
    if (!formData.categoryValue.trim()) {
      newErrors.categoryValue = "Category is required";
    }
    if(formData.agreedTCs !== true) {
        newErrors.agreedTCs  = "Terms and Conditions need to be accepted";
    }

    setErrors(newErrors);

    // If there are no errors, submit the form
   if (Object.keys(newErrors).length === 0) {
      try {
        // Create a FormData for the entire form data
        const fullFormData = new FormData();
        for (const key in formData) {
          fullFormData.append(key, formData[key]);
        }
             console.log(fullFormData)
        // Upload the image and other form data (assuming backend handles it)
        const response = await fetch("http://localhost:3000/api/create/idea", {
          method: "POST",
          body: fullFormData,
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        const responseData = await response.json();
        // Handle successful submission (e.g., display success message)
             console.log(responseData)
      } catch (error) {
        console.error("Error during form submission:", error);
        // Handle any errors during submission (e.g., display error message)
      }
    } else {
      console.log("Form has errors:", newErrors);
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <div>
        <label>Title</label>
        <input
          name="ideaTitle"
          type="text"
          value={formData.ideaTitle}
          onChange={handleInputChange}
        />
        <small>{errors.ideaTitle}</small>
      </div>
      <div>
        <label htmlFor="ideaText"> Details</label>
      <textarea id="ideaText" name="ideaText" rows="4" cols="30" value={formData.ideaText}
          onChange={handleInputChange}>

          </textarea>
        <small>{errors.ideaText}</small>
      </div>
      <div>
        <label htmlFor="categoryValue">Category</label>
        <select
          id="categoryValue"
          name="categoryValue"
          value={formData.categoryValue}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.categoryid} value={category.categoryid}>
              {category.categoryname}
            </option>
          ))}
        </select>
        <small>{errors.categoryValue}</small>
      </div>
      <div>
        <label>Anonymously</label>
        <input
          type="checkbox"
          name="isAnonymous"
          checked={formData.isAnonymous}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Terms & Conditions</label>
        <input
          type="checkbox"
          name="agreedTCs"
          checked={formData.agreedTCs}
          onChange={handleInputChange}
        />
         <small>{errors.agreedTCs}</small>
      </div>

    
      <button type="submit">Submit</button>
    </form>
  );
}
