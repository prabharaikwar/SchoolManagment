import React from "react";

interface ErrorMessageProps {
    error: string; 
  }

  const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="alert  p-1 mt-1 text-danger">
      {error}
    </div>
  );
};

export default ErrorMessage;
