"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
const Thumbdown = ({ id }) => {
 const router = useRouter();
const [Message, setMessage] = useState('');

const handlethumbup = async (event) => {

    try {
        event.preventDefault();
console.log(id);

const data = { ideaid: parseInt(id)};
console.log(data)

const response = await fetch(`http://localhost:3000/api/thumbs/thumbdown`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

    if (!response.ok) {
          throw new Error("Form submission failed");
        }
        const responseData = await response.json();
        console.log(responseData);
         setMessage(responseData.message);
         const timeout = setTimeout(() => setMessage(''), 3000); 
           return () => clearTimeout(timeout);
    } catch (error) {
        return NextResponse.json({ message: 'Error Fetching User Data ' });
    }finally {
    router.refresh();
  }

}
  return (
  <>
      
      <Button type="button"  onClick={handlethumbup}  variant="info">
      thumbdown 
      </Button>
      {Message && <Alert variant="light"> {Message}</Alert>}
  </>
    
  );
}
export default Thumbdown  ;