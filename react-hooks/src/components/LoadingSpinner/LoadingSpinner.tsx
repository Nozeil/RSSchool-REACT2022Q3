import React from 'react';
import cl from './LoadingSpinner.module.css';

function LoadingSpinner() {
  return (
    <svg className={cl.spinner} viewBox="0 0 50 50" data-testid="spinner">
      <circle className={cl.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>
  );
}

export default LoadingSpinner;
