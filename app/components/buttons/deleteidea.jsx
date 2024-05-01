"use client"

import Button from 'react-bootstrap/Button';
const Deleteidea = ({ ideaid }) => {


const handleDelete = async (event) => {
event.preventDefault();


const data = { ideaid: parseInt(ideaid)};

    
const response = await fetch("http://localhost:3000/api/delete/idea", {
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
    <Button type="button"  onClick={handleDelete} variant="info">
      Delete
    </Button>
  );
}
export default Deleteidea;