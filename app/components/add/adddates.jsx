'use client'
import React, { useState } from 'react';

const IdeaDateForm = () => {
  // State variables to hold form data
  const [formData, setFormData] = useState({
    academicyear: '',
    closuredate: '',
    finalclosuredate: ''
  });

  // Function to handle form submission
  const handleSubmit =  async (event) => {
    event.preventDefault();
 const formattedData = {
  academicyear: formData.academicyear,
  closuredate: `${formData.closuredate}T00:00:00.000Z`,
  finalclosuredate: `${formData.finalclosuredate}T00:00:00.000Z`
};
    const response = await fetch("http://localhost:3000/api/create/date", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        });
    if (!response.ok) {
          throw new Error("Form submission failed");
        }


        const responseData = await response.json();
        console.log(responseData);
  

    console.log('Form submitted:', formData);
  
    setFormData({
      academicyear: '',
      closuredate: '',
      finalclosuredate: ''
    });
  };

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="academicyear">Academic Year</label>
        <input
          type="text"
          id="academicyear"
          name="academicyear"
          value={formData.academicyear}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="closuredate">Closure Date</label>
        <input
          type="date"
          id="closuredate"
          name="closuredate"
          value={formData.closuredate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="finalclosuredate">Final Closure Date</label>
        <input
          type="date"
          id="finalclosuredate"
          name="finalclosuredate"
          value={formData.finalclosuredate}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default IdeaDateForm;