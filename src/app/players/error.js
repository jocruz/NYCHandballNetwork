"use client";

const error = (error) => {
  return <div>An error occurred : {error.error.message}</div>;
};

export default error;
