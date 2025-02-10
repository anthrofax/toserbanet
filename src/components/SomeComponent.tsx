import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SomeComponent() {
  const handleError = () => {
    toast.error('This is an error message');
  };

  const handleSuccess = () => {
    toast.success('This is a success message');
  };

  return (
    <div>
      <button onClick={handleError}>Show Error Toast</button>
      <button onClick={handleSuccess}>Show Success Toast</button>
    </div>
  );
}

export default SomeComponent;
