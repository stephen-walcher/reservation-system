// Import base React packages
import React from 'react';

// Set up Error Message Component
const ErrorMessage = ({ error }) => (
  <div>
    <small>{error.message}</small>
  </div>
);

export default ErrorMessage;
