import React from 'react';

const CheckIcon = ({ className, fill = '#fbfbfb' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill}
        d="M8 13.333l-2.667 2.667 8 8 13.333-13.333-2.667-2.667-10.667 10.667-5.333-5.333z"
      />
    </svg>
  );
};

export default CheckIcon;

