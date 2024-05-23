import React from 'react';

const LinkButton = ({ href, onClick, children }) => {
  const handleClick = (event) => {
    event.preventDefault();
    if (onClick) onClick(event);
  };

  return (
    <a href={href} onClick={handleClick} className="linkButton">
      {children}
    </a>
  );
};

export default LinkButton;
