import React from 'react';

interface ErrorContainerProps {
  title: string;
  message: string;
}

const ErrorContainer: React.FC<ErrorContainerProps> = ({ title, message }) => (
  <div className="main-container error-container">
    <h2>{title}</h2>
    <p>{message}</p>
  </div>
);

export default ErrorContainer;
