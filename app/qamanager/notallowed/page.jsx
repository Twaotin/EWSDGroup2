import React from "react";
import Alert from 'react-bootstrap/Alert';
const Notallowed = () => {
  return (
    <div>
      
      <Alert variant="danger"> You do not have the required role to access to this page</Alert>
    </div>
  );
};

export default Notallowed ;