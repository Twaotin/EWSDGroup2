"use client"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
const Deletdate = ({ closuredateid }) => {


const handleDelete = async (event) => {
event.preventDefault();
console.log(closuredateid);

const data = { closuredateid: parseInt(closuredateid)};

    
const response = await fetch("http://localhost:3000/api/delete/date", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    if (!response.ok) {
          throw new Error("Form submission failed");
        }


        const responseData = await response.json();
        console.log(responseData);
}
return (
    <Button type="button"  onClick={handleDelete}>
      Delete
    </Button>
  );
}
export default Deletdate;