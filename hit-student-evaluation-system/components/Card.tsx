
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  extraClasses?: string;
}

const Card: React.FC<CardProps> = ({ children, extraClasses = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-lg border border-gray-200 shadow-sm ${extraClasses}`}>
      {children}
    </div>
  );
};

export default Card;
