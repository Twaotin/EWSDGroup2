import React from "react";
import Alert from 'react-bootstrap/Alert';
const Notallowed = () => {
  return (
    <div className="notallowedmain">
    <div className="notallowedsub">
      <Alert variant="danger"> You do not have the required role to access to this page</Alert>
      </div>
  </div>
  );
};

export default Notallowed ;