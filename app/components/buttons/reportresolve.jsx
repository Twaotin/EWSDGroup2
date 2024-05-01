"use client"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
const Editreport = ({ reportid }) => {


const handleDelete = async (event) => {
event.preventDefault();
console.log(reportid);

const data = { reportid: parseInt(reportid)};
const response = await fetch("http://localhost:3000/api/edit/report", {
          method: "PATCH",
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
      Resolve 
    </Button>
  );
}
export default Editreport;