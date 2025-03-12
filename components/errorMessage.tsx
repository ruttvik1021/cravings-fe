import React from "react";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="bg-destructive/15 text-destructive text-sm p-2 rounded-md">
      {message}
    </div>
  );
};

export default ErrorMessage;
