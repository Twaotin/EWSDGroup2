'use client'
import React, { useState  } from 'react';
import { useRouter } from 'next/navigation'
const CommentForm = ({ id }) => {
    const router = useRouter()
  const [comment, setComment] = useState({
    commenttext: '',
    isanonymous:  false,
    ideaid: parseInt(id)
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setComment({ ...comment, [name]: newValue });
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    // Validate form fields
    const newErrors = {};
    if ( !comment.commenttext) {
      newErrors.requiredFields = 'field are required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
   
    try {
      const response = await fetch('http://localhost:3000/api/create/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }else{
            router.refresh()
      }
      const responseData = await response.json();

             console.log(responseData)
      setSuccessMessage('Comment submitted successfully!');
      // Clear form fields
      setComment({
        commenttext: '',
        isanonymous: false,
        ideaid: parseInt(id)
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting comment:', error.message);
    }
  };

  return (
    <div>
      <h2>Add a Comment</h2>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="commenttext">Comment Text:</label>
          <textarea
            id="commenttext"
            name="commenttext"
            value={comment.commenttext}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="isanonymous"
              checked={comment.isanonymous}
              onChange={handleChange}
            />
            Anonymous
          </label>
        </div>
        {errors.requiredFields && <p>{errors.requiredFields}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentForm;
