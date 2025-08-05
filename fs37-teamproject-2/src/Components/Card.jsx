import React from 'react';

const Card = ({ title, children, linkText }) => (
  <div 
    className="flex flex-col items-center justify-between bg-white rounded-2xl shadow p-6 text-center h-full transition-all duration-200 
    hover:border hover:border-[#006450] hover:shadow-lg hover:scale-[1.02]"
  >
    <div className="flex flex-col items-center flex-grow justify-center">
        <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
        <p className="text-black">
          {children}
        </p>
    </div>
    
    <a className="mt-4 text-[#006450] font-medium hover:underline">
      {linkText}
    </a>
  </div>
);

export default Card;