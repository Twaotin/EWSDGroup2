"use client"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
const Deletcatergory = ({ categoryid }) => {


const handleDelete = async (event) => {
event.preventDefault();
console.log(categoryid);

const data = { categoryid: parseInt(categoryid)};
console.log(data)

const response = await fetch("http://localhost:3000/api/delete/catergory", {
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
export default Deletcatergory;