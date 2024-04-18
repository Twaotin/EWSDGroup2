'use client'
import React, { useState } from 'react';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};
    let isValid = true;

    if (!email.trim()) {
      validationErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Invalid email address';
      isValid = false;
    }

    setErrors(validationErrors);

    if (isValid) {
      try {
        const response = await fetch('http://localhost:3000/api/create/resetpassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }); 
          const responseData = await response.json();
          console.log(responseData)
        if (!response.ok) {
          throw new Error('There was an error sending the reset password email.');
        }

        console.log('Success! Reset email sent.');
      } catch (error) {
        console.error('Error submitting comment:', error.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Reset;
