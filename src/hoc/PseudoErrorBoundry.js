import React from 'react';
const ErrorBoundry = (props) => {
  if (props.error) {
    return <h1 className="center">Something went wrong</h1>;
  }
  return props.children;
};
export default ErrorBoundry;
