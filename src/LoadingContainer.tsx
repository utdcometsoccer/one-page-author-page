import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingContainerProps {
  label?: string;
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({ label }) => (
  <div className="main-container loading-container">
    <CircularProgress aria-label={label || 'Loading...'} />
  </div>
);

export default LoadingContainer;
