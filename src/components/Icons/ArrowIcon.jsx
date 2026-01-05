import React from 'react';

const ArrowIcon = ({ className, fill = '#fbfbfb' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill}
        d="M25.243 1.722c-0.154-1.094-1.165-1.856-2.259-1.702l-17.825 2.505c-1.094 0.154-1.856 1.165-1.702 2.259s1.165 1.856 2.259 1.702l15.844-2.227 2.227 15.844c0.154 1.094 1.165 1.856 2.259 1.702s1.856-1.165 1.702-2.259l-2.505-17.825zM3.194 31.955l21.665-28.751-3.195-2.407-21.665 28.751 3.195 2.407z"
      />
    </svg>
  );
};

export default ArrowIcon;

