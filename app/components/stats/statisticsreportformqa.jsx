"use client"
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Alert from 'react-bootstrap/Alert';
export default function Statisticsform() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    closuredateid: "",
  });

  const [errors, setErrors] = useState({});
  const [closuredateid, setClosuredateid] = useState([]);
  const [Success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fetch/dates');
        const data = await response.json();
        setClosuredateid(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setFormData({  closuredateid: value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    const Formerrors = {};
    
    if (!formData.closuredateid.trim()) {
      Formerrors.closuredateid = "Academic year is required";
    }

    setErrors(Formerrors);

    if (Object.keys(Formerrors).length === 0) {
        try {
            console.log(formData.closuredateid)
        router.push(`http://localhost:3000/qamanager/statisticalanalysis/statisticsreportshow/${formData.closuredateid}`);

        setErrors({});
    
        
       
        
        
        
      } catch (error) {
        console.error("Error during form submission:", error);
       
      }
    } else {
      console.log("Form has errors:", Formerrors);
    }
  };

  return (
    <>
    <div className="">
      <div className="tabledata">
         
     
        <h2>Select academicyear</h2>

     {Success && <Alert variant="light"> {Success}</Alert>}
      <Form onSubmit={handleRegistration}>
      <FormGroup>
        <FormLabel>Category</FormLabel>
        <FormControl
          as="select"
          name="closuredateid"
          value={formData.closuredateid}
          onChange={handleCategoryChange}
          isInvalid={!!errors.closuredateid}
                      >
                        
          <option value="">Select Academic Year</option>
          {closuredateid.map((closure) => (
            <option key={closure.closuredateid} value={closure.closuredateid}>
              {closure.academicyear}
            </option>
          ))}
        </FormControl>
        <FormControl.Feedback type="invalid">{errors.categoryValue}</FormControl.Feedback>
      </FormGroup>

      

     

      <Button type="submit" variant="info">Submit</Button>
    </Form>
    </div>
    </div>
    </>
  );
}

